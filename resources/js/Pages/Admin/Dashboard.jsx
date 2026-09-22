import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function AdminDashboard({
    admin,
    stats,
    listings = [],
    users = [],
    brands = [],
    flash = {},
}) {
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'listings', 'users', 'brands'
    const [toastMessage, setToastMessage] = useState(flash?.success || null);
    const [toastType, setToastType] = useState(flash?.error ? 'error' : 'success');

    // Search and filters
    const [listingSearch, setListingSearch] = useState('');
    const [listingFilter, setListingFilter] = useState('all'); // 'all', 'featured', 'regular'
    const [userSearch, setUserSearch] = useState('');
    const [userRoleFilter, setUserRoleFilter] = useState('all'); // 'all', 'admins', 'sellers'
    const [brandSearch, setBrandSearch] = useState('');

    // Modals
    const [confirmModal, setConfirmModal] = useState(null); // { title, message, onConfirm, isDestructive }
    const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);

    // Add Brand Form
    const { data: brandData, setData: setBrandData, post: postBrand, processing: brandProcessing, errors: brandErrors, reset: resetBrand } = useForm({
        name: '',
        popular: false,
    });

    // Handle flash toast messages
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            const timer = setTimeout(() => setToastMessage(null), 4000);
            return () => clearTimeout(timer);
        }
        if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            const timer = setTimeout(() => setToastMessage(null), 4500);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleLogout = () => {
        router.post(route('admin.logout'));
    };

    // Toggle featured status for a vehicle
    const handleToggleFeatured = (carId) => {
        router.patch(route('admin.listings.toggleFeatured', carId), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Delete listing confirmation
    const handleDeleteListing = (car) => {
        setConfirmModal({
            title: 'Delete Vehicle Listing',
            message: `Are you sure you want to delete "${car.name}"? This vehicle will be permanently removed from the CarBazar platform.`,
            confirmLabel: 'Yes, Delete Vehicle',
            isDestructive: true,
            onConfirm: () => {
                router.delete(route('admin.listings.delete', car.id), {
                    preserveScroll: true,
                    onSuccess: () => setConfirmModal(null),
                });
            },
        });
    };

    // Toggle user admin role
    const handleToggleAdmin = (targetUser) => {
        const actionText = targetUser.is_admin ? 'demote to regular Seller' : 'promote to Platform Administrator';
        setConfirmModal({
            title: 'Change User Role',
            message: `Are you sure you want to ${actionText} for ${targetUser.name} (${targetUser.email})?`,
            confirmLabel: 'Confirm Role Change',
            isDestructive: false,
            onConfirm: () => {
                router.patch(route('admin.users.toggleAdmin', targetUser.id), {}, {
                    preserveScroll: true,
                    onSuccess: () => setConfirmModal(null),
                });
            },
        });
    };

    // Delete user
    const handleDeleteUser = (targetUser) => {
        setConfirmModal({
            title: 'Delete User & Listings',
            message: `Are you sure you want to delete ${targetUser.name}? All cars uploaded by this user will also be permanently deleted.`,
            confirmLabel: 'Permanently Delete User',
            isDestructive: true,
            onConfirm: () => {
                router.delete(route('admin.users.delete', targetUser.id), {
                    preserveScroll: true,
                    onSuccess: () => setConfirmModal(null),
                });
            },
        });
    };

    // Submit new brand
    const handleAddBrandSubmit = (e) => {
        e.preventDefault();
        postBrand(route('admin.brands.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsAddBrandOpen(false);
                resetBrand();
            },
        });
    };

    // Delete brand
    const handleDeleteBrand = (brand) => {
        setConfirmModal({
            title: 'Delete Vehicle Brand',
            message: `Delete brand "${brand.name}" and all its linked model designations?`,
            confirmLabel: 'Delete Brand',
            isDestructive: true,
            onConfirm: () => {
                router.delete(route('admin.brands.delete', brand.id), {
                    preserveScroll: true,
                    onSuccess: () => setConfirmModal(null),
                });
            },
        });
    };

    // Filtered listings
    const filteredListings = listings.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(listingSearch.toLowerCase()) ||
            item.brand.toLowerCase().includes(listingSearch.toLowerCase()) ||
            item.seller_name.toLowerCase().includes(listingSearch.toLowerCase());
        if (listingFilter === 'featured') return matchesSearch && item.is_featured;
        if (listingFilter === 'regular') return matchesSearch && !item.is_featured;
        return matchesSearch;
    });

    // Filtered users
    const filteredUsers = users.filter((u) => {
        const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(userSearch.toLowerCase());
        if (userRoleFilter === 'admins') return matchesSearch && u.is_admin;
        if (userRoleFilter === 'sellers') return matchesSearch && !u.is_admin;
        return matchesSearch;
    });

    // Filtered brands
    const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Platform Control Center | CarBazar Admin" />

            {/* Toast Notification */}
            {toastMessage && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200 ${
                    toastType === 'error'
                        ? 'bg-red-950/90 border-red-800 text-red-200'
                        : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
                }`}>
                    {toastType === 'error' ? (
                        <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span>{toastMessage}</span>
                    <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
                        &times;
                    </button>
                </div>
            )}

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-lg font-black tracking-tight text-white">Car<span className="text-blue-500">Bazar</span></span>
                                <span className="ml-2 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">SuperAdmin</span>
                            </div>
                        </Link>
                    </div>

                    {/* Center Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === 'overview'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('listings')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                activeTab === 'listings'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                        >
                            <span>Vehicles</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
                                {listings.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                activeTab === 'users'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                        >
                            <span>Users & Sellers</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
                                {users.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('brands')}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                activeTab === 'brands'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                        >
                            <span>Brands</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
                                {brands.length}
                            </span>
                        </button>
                    </nav>

                    {/* Right User Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('dashboard')}
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/50 transition-colors"
                            title="Open Seller Inventory Dashboard"
                        >
                            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Seller View</span>
                        </Link>

                        <Link
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 transition-colors"
                        >
                            <span>Live Site</span>
                            <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>

                        <div className="h-4 w-px bg-slate-800" />

                        {/* Admin Badge & Logout */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow">
                                {admin?.name ? admin.name.charAt(0) : 'A'}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Sign Out Admin"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Tab Nav */}
                <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg ${activeTab === 'listings' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                        Vehicles ({listings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                        Users ({users.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('brands')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg ${activeTab === 'brands' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                        Brands ({brands.length})
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Platform Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {/* Total Vehicles */}
                    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Vehicles</p>
                                <p className="text-3xl font-black text-white mt-1.5">{stats?.totalCars ?? 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2zM9 9h6m-6 4h6" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>Live Marketplace Inventory</span>
                        </div>
                    </div>

                    {/* Featured Vehicles */}
                    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Featured Cars</p>
                                <p className="text-3xl font-black text-amber-400 mt-1.5">{stats?.featuredCars ?? 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <span className="text-amber-400 font-medium">Spotlight Showcase</span>
                            <span>on Homepage</span>
                        </div>
                    </div>

                    {/* Total Users / Sellers */}
                    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Users</p>
                                <p className="text-3xl font-black text-white mt-1.5">{stats?.totalUsers ?? 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <span className="text-indigo-400 font-medium">{stats?.totalSellers ?? 0} Sellers</span>
                            <span>+ Admins</span>
                        </div>
                    </div>

                    {/* Total Brands */}
                    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Supported Brands</p>
                                <p className="text-3xl font-black text-white mt-1.5">{stats?.totalBrands ?? 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <span>OEM Manufacturers Active</span>
                        </div>
                    </div>
                </div>

                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Quick Platform Actions Bar */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-base font-bold text-white">Quick Control Hub</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Frequent administrative tasks and platform management shortcuts</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2.5">
                                <button
                                    onClick={() => { setActiveTab('listings'); setListingFilter('featured'); }}
                                    className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Manage Featured Listings
                                </button>
                                <button
                                    onClick={() => setIsAddBrandOpen(true)}
                                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Brand
                                </button>
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                                >
                                    Manage Users ({users.length})
                                </button>
                            </div>
                        </div>

                        {/* Two Columns: Recent Listings & Recent Users */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Listings */}
                            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h3 className="text-sm font-bold text-white">Latest Vehicle Listings</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Recently submitted to CarBazar</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('listings')}
                                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                                    >
                                        View all &rarr;
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {listings.slice(0, 5).map((car) => (
                                        <div key={car.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-all">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <img
                                                    src={car.main_image || '/images/default-car.jpg'}
                                                    alt={car.name}
                                                    className="w-12 h-10 object-cover rounded-lg bg-slate-800 flex-shrink-0"
                                                    onError={(e) => { e.target.src = '/images/corolla-cross-1.jpg'; }}
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-white truncate">{car.name}</p>
                                                    <p className="text-[11px] text-slate-400 truncate">Seller: {car.seller_name} &bull; {car.asking_price || 'Price on request'}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                                <button
                                                    onClick={() => handleToggleFeatured(car.id)}
                                                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                                        car.is_featured
                                                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                                    }`}
                                                    title={car.is_featured ? 'Click to unfeature' : 'Click to feature on homepage'}
                                                >
                                                    {car.is_featured ? 'Featured' : 'Standard'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {listings.length === 0 && (
                                        <p className="text-xs text-slate-500 py-4 text-center">No vehicles listed yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Users */}
                            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h3 className="text-sm font-bold text-white">Registered Accounts</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Sellers & administrative accounts</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('users')}
                                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                                    >
                                        View all &rarr;
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {users.slice(0, 5).map((u) => (
                                        <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-all">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white uppercase flex-shrink-0 ${
                                                    u.is_admin
                                                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 ring-2 ring-purple-500/30'
                                                        : 'bg-slate-800'
                                                }`}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-white truncate flex items-center gap-2">
                                                        <span>{u.name}</span>
                                                        {u.id === admin?.id && (
                                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-semibold">You</span>
                                                        )}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                                    u.is_admin
                                                        ? 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                                                        : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                                                }`}>
                                                    {u.is_admin ? 'Admin' : 'Seller'}
                                                </span>
                                                <span className="text-[11px] text-slate-500 font-mono">
                                                    {u.cars_count} {u.cars_count === 1 ? 'car' : 'cars'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {users.length === 0 && (
                                        <p className="text-xs text-slate-500 py-4 text-center">No users found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: VEHICLE MANAGEMENT */}
                {activeTab === 'listings' && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                        {/* Header & Filters */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white">Vehicle Inventory Management</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Control all seller vehicles, toggle featured status, or remove inappropriate listings</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={listingSearch}
                                        onChange={(e) => setListingSearch(e.target.value)}
                                        placeholder="Search by title, brand, seller..."
                                        className="w-64 bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                    />
                                    <svg className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {/* Filter buttons */}
                                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                                    <button
                                        onClick={() => setListingFilter('all')}
                                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${listingFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        All ({listings.length})
                                    </button>
                                    <button
                                        onClick={() => setListingFilter('featured')}
                                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${listingFilter === 'featured' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Featured ({listings.filter(c => c.is_featured).length})
                                    </button>
                                    <button
                                        onClick={() => setListingFilter('regular')}
                                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${listingFilter === 'regular' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Standard ({listings.filter(c => !c.is_featured).length})
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Vehicles Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-950/80 uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-800">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Vehicle</th>
                                        <th className="px-4 py-3 font-semibold">Seller</th>
                                        <th className="px-4 py-3 font-semibold">Price</th>
                                        <th className="px-4 py-3 font-semibold">Location</th>
                                        <th className="px-4 py-3 font-semibold text-center">Featured</th>
                                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {filteredListings.map((car) => (
                                        <tr key={car.id} className="hover:bg-slate-800/30 transition-colors">
                                            {/* Vehicle Info */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={car.main_image || '/images/default-car.jpg'}
                                                        alt={car.name}
                                                        className="w-14 h-10 object-cover rounded-lg bg-slate-800 flex-shrink-0"
                                                        onError={(e) => { e.target.src = '/images/corolla-cross-1.jpg'; }}
                                                    />
                                                    <div>
                                                        <Link
                                                            href={route('car.details', car.slug)}
                                                            className="font-bold text-white hover:text-blue-400 transition-colors"
                                                        >
                                                            {car.name}
                                                        </Link>
                                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                                            <span>{car.year}</span>
                                                            <span>&bull;</span>
                                                            <span>{car.condition || 'Used'}</span>
                                                            {car.category && (
                                                                <>
                                                                    <span>&bull;</span>
                                                                    <span className="capitalize text-slate-500">{car.category}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Seller Info */}
                                            <td className="px-4 py-3.5">
                                                <p className="font-medium text-white">{car.seller_name}</p>
                                                <p className="text-[11px] text-slate-500">{car.seller_email}</p>
                                            </td>

                                            {/* Price */}
                                            <td className="px-4 py-3.5">
                                                <span className="font-semibold text-emerald-400">{car.asking_price || 'Inquire'}</span>
                                            </td>

                                            {/* Location */}
                                            <td className="px-4 py-3.5 text-slate-400">
                                                {car.location || 'Bangladesh'}
                                            </td>

                                            {/* Featured Switch */}
                                            <td className="px-4 py-3.5 text-center">
                                                <button
                                                    onClick={() => handleToggleFeatured(car.id)}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                                                        car.is_featured
                                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                                                            : 'bg-slate-800 text-slate-400 border border-slate-700/50 hover:text-slate-200 hover:bg-slate-700'
                                                    }`}
                                                    title="Toggle Featured placement on homepage"
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${car.is_featured ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
                                                    {car.is_featured ? 'Featured' : 'Standard'}
                                                </button>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('car.details', car.slug)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                                        title="View vehicle on site"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteListing(car)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                        title="Delete listing"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredListings.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="py-12 text-center text-slate-500 text-xs">
                                                No vehicles found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 3: USER & SELLER MANAGEMENT */}
                {activeTab === 'users' && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                        {/* Header & Filters */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white">Users & Sellers Directory</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Manage user permissions, elevate members to Admin, or manage seller accounts</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={userSearch}
                                        onChange={(e) => setUserSearch(e.target.value)}
                                        placeholder="Search by name, email..."
                                        className="w-64 bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                    />
                                    <svg className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {/* Role Filter buttons */}
                                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                                    <button
                                        onClick={() => setUserRoleFilter('all')}
                                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${userRoleFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        All ({users.length})
                                    </button>
                                    <button
                                        onClick={() => setUserRoleFilter('admins')}
                                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${userRoleFilter === 'admins' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Admins ({users.filter(u => u.is_admin).length})
                                    </button>
                                    <button
                                        onClick={() => setUserRoleFilter('sellers')}
                                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${userRoleFilter === 'sellers' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Sellers ({users.filter(u => !u.is_admin).length})
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-950/80 uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-800">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">User</th>
                                        <th className="px-4 py-3 font-semibold">Email</th>
                                        <th className="px-4 py-3 font-semibold">Role</th>
                                        <th className="px-4 py-3 font-semibold">Listings</th>
                                        <th className="px-4 py-3 font-semibold">Joined Date</th>
                                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {filteredUsers.map((u) => {
                                        const isSelf = u.id === admin?.id;
                                        return (
                                            <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                                                {/* User name & avatar */}
                                                <td className="px-4 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white uppercase flex-shrink-0 ${
                                                            u.is_admin
                                                                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 ring-2 ring-purple-500/30'
                                                                : 'bg-slate-800'
                                                        }`}>
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white flex items-center gap-1.5">
                                                                <span>{u.name}</span>
                                                                {isSelf && (
                                                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-semibold">You</span>
                                                                )}
                                                            </p>
                                                            <p className="text-[11px] text-slate-500">ID: #{u.id}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td className="px-4 py-3.5 font-mono text-slate-300">
                                                    {u.email}
                                                </td>

                                                {/* Role */}
                                                <td className="px-4 py-3.5">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        u.is_admin
                                                            ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300'
                                                            : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                                                    }`}>
                                                        {u.is_admin ? 'SuperAdmin' : 'Seller'}
                                                    </span>
                                                </td>

                                                {/* Listings Count */}
                                                <td className="px-4 py-3.5 font-semibold text-white">
                                                    {u.cars_count} {u.cars_count === 1 ? 'vehicle' : 'vehicles'}
                                                </td>

                                                {/* Joined Date */}
                                                <td className="px-4 py-3.5 text-slate-400">
                                                    {u.created_at}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-4 py-3.5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleToggleAdmin(u)}
                                                            disabled={isSelf}
                                                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                                                                isSelf
                                                                    ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                                                                    : u.is_admin
                                                                        ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                                                                        : 'bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/30 text-purple-300'
                                                            }`}
                                                            title={isSelf ? 'Cannot modify your own status' : u.is_admin ? 'Demote to regular seller' : 'Promote to Administrator'}
                                                        >
                                                            {u.is_admin ? 'Demote' : 'Make Admin'}
                                                        </button>

                                                        <button
                                                            onClick={() => handleDeleteUser(u)}
                                                            disabled={isSelf}
                                                            className={`p-1.5 rounded-lg transition-colors ${
                                                                isSelf
                                                                    ? 'opacity-30 cursor-not-allowed text-slate-600'
                                                                    : 'text-slate-400 hover:text-red-400 hover:bg-red-500/10'
                                                            }`}
                                                            title={isSelf ? 'Cannot delete your own account' : 'Delete user and their listings'}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="py-12 text-center text-slate-500 text-xs">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TAB 4: BRAND CATALOG */}
                {activeTab === 'brands' && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                        {/* Header & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white">Car Brands & Manufacturers</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Manage supported car brands and vehicle classifications</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={brandSearch}
                                        onChange={(e) => setBrandSearch(e.target.value)}
                                        placeholder="Search brand..."
                                        className="w-48 bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                    />
                                    <svg className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <button
                                    onClick={() => setIsAddBrandOpen(true)}
                                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Brand
                                </button>
                            </div>
                        </div>

                        {/* Brands Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredBrands.map((brand) => (
                                <div
                                    key={brand.id}
                                    className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-700 transition-colors group"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-white text-sm">{brand.name}</h4>
                                            {brand.popular && (
                                                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">Popular</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 font-mono">
                                            {brand.models_count} {brand.models_count === 1 ? 'model' : 'models'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteBrand(brand)}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                        title="Delete brand"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {filteredBrands.length === 0 && (
                                <div className="col-span-full py-12 text-center text-slate-500 text-xs">
                                    No brands found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* CONFIRMATION MODAL */}
            {confirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-base font-bold text-white mb-2">{confirmModal.title}</h3>
                        <p className="text-xs text-slate-300 mb-6 leading-relaxed">{confirmModal.message}</p>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmModal(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmModal.onConfirm}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-colors ${
                                    confirmModal.isDestructive
                                        ? 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
                                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
                                }`}
                            >
                                {confirmModal.confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD BRAND MODAL */}
            {isAddBrandOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-white">Add Vehicle Brand</h3>
                            <button
                                onClick={() => setIsAddBrandOpen(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleAddBrandSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    Brand Name
                                </label>
                                <input
                                    type="text"
                                    value={brandData.name}
                                    onChange={(e) => setBrandData('name', e.target.value)}
                                    placeholder="e.g. Porsche, Tesla, Hyundai"
                                    autoFocus
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                                {brandErrors.name && (
                                    <p className="mt-1 text-xs text-red-400">{brandErrors.name}</p>
                                )}
                            </div>

                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={brandData.popular}
                                    onChange={(e) => setBrandData('popular', e.target.checked)}
                                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0"
                                />
                                Highlight as Popular Brand on homepage
                            </label>

                            <div className="flex items-center justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddBrandOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={brandProcessing}
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-colors"
                                >
                                    {brandProcessing ? 'Adding...' : 'Save Brand'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
