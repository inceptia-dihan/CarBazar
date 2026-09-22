import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Dashboard({
    auth,
    user: propUser,
    stats: propStats,
    userListings = [],
    savedCars = [],
    recommendedCars = [],
    inquiries = [],
    brandsWithModels = [],
    flash,
}) {
    const user = propUser || auth?.user || { name: 'User', email: 'user@example.com' };

    // Active tab
    const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'saved', 'inquiries', 'market'
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [replyModalData, setReplyModalData] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [toastMessage, setToastMessage] = useState(flash?.success || null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [photoPreviews, setPhotoPreviews] = useState([]);
    const [activeStep, setActiveStep] = useState(1); // 1: Basic & Price, 2: Specs, 3: Equipment & Photos

    // Inertia form for uploading car
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        brand: 'Toyota',
        model: 'Corolla Cross',
        year: 2023,
        condition: 'Reconditioned',
        category: 'popular',
        asking_price: '৳ 38,50,000',
        engine: '1.8L Hybrid VVT-i',
        fuel_type: 'Hybrid',
        body_type: 'SUV',
        transmission: 'Automatic',
        drive: 'AWD',
        mileage: '18,000',
        color: 'Pearl White',
        registration_year: '2023',
        location: 'Gulshan-2, Dhaka',
        description: '',
        equipment: [
            'Push Start & Smart Key',
            '360° Panoramic Camera',
            'Automatic Climate Control AC',
            'Dual SRS Airbags & ABS with EBD',
        ],
        phone: '+880 1711-234567',
        photos: [],
        preset_image: '/images/corolla-cross-1.jpg',
    });

    // Available models for selected brand
    const currentBrandObj = brandsWithModels.find((b) => b.name === data.brand);
    const availableModels = currentBrandObj?.models && currentBrandObj.models.length > 0
        ? currentBrandObj.models
        : ['Corolla', 'Camry', 'RAV4', 'Harrier', 'Land Cruiser'];

    // Flash toast listener
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setTimeout(() => setToastMessage(null), 4000);
        }
    }, [flash]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    // Handle Brand change and update model
    const handleBrandChange = (e) => {
        const brandName = e.target.value;
        const brandObj = brandsWithModels.find((b) => b.name === brandName);
        const firstModel = brandObj?.models?.[0] || 'Standard';
        setData((prev) => ({
            ...prev,
            brand: brandName,
            model: firstModel,
            name: `${prev.year} ${brandName} ${firstModel}`,
        }));
    };

    // Handle Photos Selection
    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setData('photos', files);

        // Generate local preview URLs
        const previews = files.map((file) => ({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            url: URL.createObjectURL(file),
        }));
        setPhotoPreviews(previews);
    };

    const handleRemovePhoto = (index) => {
        const newPhotos = [...data.photos];
        newPhotos.splice(index, 1);
        setData('photos', newPhotos);

        const newPreviews = [...photoPreviews];
        newPreviews.splice(index, 1);
        setPhotoPreviews(newPreviews);
    };

    // Equipment toggle
    const toggleEquipment = (item) => {
        if (data.equipment.includes(item)) {
            setData('equipment', data.equipment.filter((i) => i !== item));
        } else {
            setData('equipment', [...data.equipment, item]);
        }
    };

    // Submit form to backend
    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route('listings.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsPostModalOpen(false);
                reset();
                setPhotoPreviews([]);
                setActiveStep(1);
                showToast('🎉 Your car listing has been published to the CarBazar marketplace!');
            },
        });
    };

    // Delete listing from backend
    const handleDeleteListing = (carId, carName) => {
        if (confirm(`Are you sure you want to delete the listing for "${carName}"? This action cannot be undone.`)) {
            router.delete(route('listings.destroy', { car: carId }), {
                preserveScroll: true,
                onSuccess: () => {
                    showToast('Listing removed successfully.');
                },
            });
        }
    };

    const equipmentOptions = [
        'Sunroof / Panoramic Moonroof',
        'Push Start & Smart Key',
        '360° Panoramic Camera',
        'Full Leather Seats',
        'Adaptive Cruise Control',
        'Lane Keeping Assist',
        'Apple CarPlay & Android Auto',
        'Alloy Wheels & Tubeless Tires',
        'LED Projector Headlamps with DRL',
        'Dual-Zone Climate Control AC',
        'Power Tailgate / Automatic Boot',
        'Heated / Ventilated Front Seats',
        'Rear AC Vents & USB Ports',
        'Wireless Smartphone Charger',
        'ABS with Electronic Brakeforce (EBD)',
        'Blind Spot Monitoring & Sensors',
    ];

    return (
        <>
            <Head title={`Dashboard - ${user.name} | CarBazar`} />

            <div className="min-h-screen bg-[#F0F4F8] font-sans flex flex-col justify-between">

                {/* ═══ TOP NOTIFICATION TOAST ═════════════════════════════════ */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-50 bg-[#0f172a] text-white px-5 py-3 rounded-xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-fade-in text-sm font-semibold">
                        <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-xs">
                            ✓
                        </div>
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* ═══ NAVBAR (Matches CarBazar Home & Details Page) ════════════ */}
                <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40 shadow-sm">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[70px]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                </svg>
                            </div>
                            <span className="text-[#1877F2] font-black text-[20px] tracking-tight">CarBazar</span>
                        </Link>

                        {/* Nav Links */}
                        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-gray-700">
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Buy</Link>
                            <button
                                type="button"
                                onClick={() => setIsPostModalOpen(true)}
                                className="hover:text-[#1877F2] transition-colors cursor-pointer"
                            >
                                Sell a Car
                            </button>
                            <Link href="/#impressive-collection-section" className="hover:text-[#1877F2] transition-colors">Hot Deals</Link>
                            <Link href="/#how-it-works-section" className="hover:text-[#1877F2] transition-colors">How it works</Link>
                            <Link href="/#why-choose-us-section" className="hover:text-[#1877F2] transition-colors">Why choose us</Link>
                        </nav>

                        {/* User Profile & Actions */}
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsPostModalOpen(true)}
                                className="hidden sm:inline-flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span>Sell a Car</span>
                            </button>

                            {/* User Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1877F2] to-blue-400 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="hidden md:block text-left text-xs">
                                        <div className="font-bold text-gray-900 leading-tight">{user?.name}</div>
                                        <div className="text-gray-400 text-[10px]">Verified Seller</div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-xs font-bold text-gray-900">{user.name}</p>
                                            <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-[#EEF4FF] hover:text-[#1877F2] font-semibold transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            Profile Settings
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer text-left"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                            </svg>
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* ═══ BREADCRUMB ═════════════════════════════════════════════ */}
                <div className="bg-white border-b border-gray-200/60 py-3">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between text-xs">
                        <nav className="flex items-center gap-2 text-gray-500 font-medium">
                            <Link href="/" className="hover:text-[#1877F2]">Home</Link>
                            <span>/</span>
                            <span className="text-gray-900 font-bold">Seller & Buyer Dashboard</span>
                        </nav>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                            <span className="font-semibold text-gray-700">Verified Seller Account</span>
                        </div>
                    </div>
                </div>

                {/* ═══ MAIN DASHBOARD CONTENT ═════════════════════════════════ */}
                <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex-1 w-full space-y-8">

                    {/* 1. USER PROFILE WELCOME BANNER */}
                    <div className="bg-gradient-to-r from-white via-white to-[#EEF4FF] rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-8">
                            <svg className="w-96 h-96 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                            </svg>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#1877F2] to-blue-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                                            Welcome, {user?.name}!
                                        </h1>
                                        <span className="bg-emerald-50 text-emerald-700 font-bold text-[11px] px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200/60">
                                            <svg className="w-3 h-3 fill-emerald-600" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Verified Seller
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs sm:text-sm">
                                        Post cars for sale with full specifications & photos, track buyer inquiries, and manage your wishlist.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                                        <span>📧 {user?.email}</span>
                                        <span>•</span>
                                        <span>📍 Dhaka, Bangladesh</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    type="button"
                                    onClick={() => setIsPostModalOpen(true)}
                                    className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02] cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span>Post a Car for Sale</span>
                                </button>
                                <Link
                                    href="/#impressive-collection-section"
                                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
                                >
                                    <span>Browse Marketplace</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* 2. STATS OVERVIEW (4 KEY METRIC CARDS) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Stat 1: Active Listings */}
                        <div
                            onClick={() => setActiveTab('listings')}
                            className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-sm ${activeTab === 'listings'
                                    ? 'border-[#1877F2] ring-2 ring-blue-500/20 shadow-md'
                                    : 'border-gray-100 hover:border-blue-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">My Cars on Sale</span>
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V14.25M3.75 14.25h16.5M3.75 14.25l1.5-6h13.5l1.5 6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                                {userListings.length}
                            </div>
                            <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                <span className="text-emerald-600 font-bold">● Published Live</span> on CarBazar
                            </div>
                        </div>

                        {/* Stat 2: Saved Wishlist */}
                        <div
                            onClick={() => setActiveTab('saved')}
                            className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-sm ${activeTab === 'saved'
                                    ? 'border-[#1877F2] ring-2 ring-blue-500/20 shadow-md'
                                    : 'border-gray-100 hover:border-blue-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Wishlist</span>
                                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 fill-rose-500" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                                {savedCars.length}
                            </div>
                            <div className="text-[11px] text-gray-500">
                                Cars tracked for price updates
                            </div>
                        </div>

                        {/* Stat 3: Buyer Inquiries */}
                        <div
                            onClick={() => setActiveTab('inquiries')}
                            className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-sm ${activeTab === 'inquiries'
                                    ? 'border-[#1877F2] ring-2 ring-blue-500/20 shadow-md'
                                    : 'border-gray-100 hover:border-blue-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Buyer Inquiries</span>
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.817-.817 5.972 5.972 0 011.057-3.035A7.472 7.472 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                                {inquiries.length}
                            </div>
                            <div className="text-[11px] text-gray-500">
                                Direct leads on your listings
                            </div>
                        </div>

                        {/* Stat 4: Total Views */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Views</span>
                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                                {userListings.reduce((acc, l) => acc + (l.views || l.viewsCount || 1), 0).toLocaleString()}
                            </div>
                            <div className="text-[11px] text-gray-500">
                                Verified buyers reached
                            </div>
                        </div>
                    </div>

                    {/* 3. DASHBOARD TABS NAVIGATION */}
                    <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm flex items-center gap-2 overflow-x-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab('listings')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${activeTab === 'listings'
                                    ? 'bg-[#1877F2] text-white shadow-md shadow-blue-500/20'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V14.25M3.75 14.25h16.5M3.75 14.25l1.5-6h13.5l1.5 6" />
                            </svg>
                            <span>My Cars for Sale</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'listings' ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                {userListings.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('saved')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${activeTab === 'saved'
                                    ? 'bg-[#1877F2] text-white shadow-md shadow-blue-500/20'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <span>Saved Wishlist</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'saved' ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                {savedCars.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('inquiries')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${activeTab === 'inquiries'
                                    ? 'bg-[#1877F2] text-white shadow-md shadow-blue-500/20'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.817-.817 5.972 5.972 0 011.057-3.035A7.472 7.472 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                            <span>Buyer Inquiries</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'inquiries' ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                {inquiries.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('market')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${activeTab === 'market'
                                    ? 'bg-[#1877F2] text-white shadow-md shadow-blue-500/20'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                            </svg>
                            <span>Market Watch & Deals</span>
                        </button>
                    </div>

                    {/* ═══ TAB 1: MY LISTINGS (CARS FOR SALE) ═════════════════ */}
                    {activeTab === 'listings' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Your Vehicle Listings</h2>
                                    <p className="text-xs text-gray-500">Active ads are visible to thousands of verified buyers on CarBazar.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsPostModalOpen(true)}
                                    className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                >
                                    + Add New Listing
                                </button>
                            </div>

                            {userListings.length === 0 ? (
                                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">No cars listed yet</h3>
                                    <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
                                        Sell your car faster at the best market price with verified buyers on CarBazar.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setIsPostModalOpen(true)}
                                        className="bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-colors"
                                    >
                                        Post Your First Car Ad
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {userListings.map((car) => (
                                        <div
                                            key={car.id}
                                            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between"
                                        >
                                            <div>
                                                {/* Image & Status Badge */}
                                                <div className="relative rounded-2xl overflow-hidden mb-4 bg-gray-100 h-48 sm:h-52">
                                                    <img
                                                        src={car.mainImage || car.main_image || '/images/hero-car.jpg'}
                                                        alt={car.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                                        <span className="bg-[#EBF3FE] text-[#1877F2] font-bold text-[11px] px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                                                            {car.brand}
                                                        </span>
                                                        <span className="bg-emerald-500 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                                            {car.listingStatus || 'Live Active'}
                                                        </span>
                                                    </div>
                                                    <div className="absolute bottom-3 right-3 bg-[#0f172a]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                                                        {car.priceLakh || car.price_lakh || car.askingPrice || car.asking_price}
                                                    </div>
                                                </div>

                                                {/* Title & Asking Price */}
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-black text-gray-900 tracking-tight leading-snug">
                                                            {car.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                                            <span>📍 {car.location || 'Dhaka, Bangladesh'}</span>
                                                            <span>•</span>
                                                            <span>📅 {car.year || '2023'}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Quick Specs Grid */}
                                                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 my-3 text-center">
                                                    <div className="bg-[#F8FAFC] rounded-xl py-1.5 px-2">
                                                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">Condition</span>
                                                        <span className="text-xs font-bold text-gray-800">{car.condition || 'Reconditioned'}</span>
                                                    </div>
                                                    <div className="bg-[#F8FAFC] rounded-xl py-1.5 px-2">
                                                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">Transmission</span>
                                                        <span className="text-xs font-bold text-gray-800">{car.type || 'Automatic'}</span>
                                                    </div>
                                                    <div className="bg-[#F8FAFC] rounded-xl py-1.5 px-2">
                                                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">Status</span>
                                                        <span className="text-xs font-bold text-[#1877F2]">Active</span>
                                                    </div>
                                                </div>

                                                {/* Views & Post date */}
                                                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        </svg>
                                                        {car.views || car.viewsCount || 1} Ad Views
                                                    </span>
                                                    <span>Posted: {car.postedAt || 'Recently'}</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                                <Link
                                                    href={route('car.details', { slug: car.slug })}
                                                    className="flex-1 bg-[#1877F2] hover:bg-blue-700 text-white py-2 rounded-xl text-center text-xs font-bold transition-colors shadow-sm"
                                                >
                                                    View Live Ad
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => showToast('Listing boosted! Featured placement activated.')}
                                                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                                                    title="Boost listing"
                                                >
                                                    ⚡ Boost
                                                </button>
                                                {car.user_id === user.id && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteListing(car.id, car.name)}
                                                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                                                        title="Delete listing permanently"
                                                    >
                                                        🗑
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══ TAB 2: SAVED CARS (WISHLIST) ═══════════════════════ */}
                    {activeTab === 'saved' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Saved Vehicles (Wishlist)</h2>
                                    <p className="text-xs text-gray-500">Track price changes and contact sellers for vehicles you are interested in.</p>
                                </div>
                                <Link
                                    href="/#impressive-collection-section"
                                    className="text-xs font-bold text-[#1877F2] hover:underline"
                                >
                                    + Add more cars
                                </Link>
                            </div>

                            {savedCars.length === 0 ? (
                                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                                    <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 fill-rose-400" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
                                    <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
                                        Save your dream cars from our collection to track prices and make inquiries directly.
                                    </p>
                                    <Link
                                        href="/#impressive-collection-section"
                                        className="inline-block bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-colors"
                                    >
                                        Explore Cars for Sale
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {savedCars.map((car) => (
                                        <div
                                            key={car.id}
                                            className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="relative rounded-2xl overflow-hidden mb-3 bg-gray-100 h-44">
                                                    <img
                                                        src={car.mainImage || car.main_image || '/images/hero-car.jpg'}
                                                        alt={car.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-2.5 left-2.5 bg-[#EBF3FE] text-[#1877F2] font-bold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                                                        {car.brand}
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
                                                    {car.name}
                                                </h3>
                                                <div className="flex items-baseline justify-between mb-3">
                                                    <div className="text-base font-black text-[#1877F2]">
                                                        {car.priceLakh || car.price_lakh || car.askingPrice || car.asking_price}
                                                    </div>
                                                    <span className="text-[11px] text-gray-400">
                                                        📍 {car.location || 'Dhaka'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                                <Link
                                                    href={route('car.details', { slug: car.slug })}
                                                    className="flex-1 bg-[#EEF4FF] hover:bg-[#1877F2] hover:text-white text-[#1877F2] py-2 rounded-xl text-center text-xs font-bold transition-all"
                                                >
                                                    View Details →
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══ TAB 3: BUYER INQUIRIES ═════════════════════════════ */}
                    {activeTab === 'inquiries' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Buyer Inquiries & Leads</h2>
                                    <p className="text-xs text-gray-500">Interested buyers reaching out regarding your vehicle listings.</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] divide-y divide-gray-100">
                                {inquiries.map((inq) => (
                                    <div key={inq.id} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] text-[#1877F2] font-black text-lg flex items-center justify-center shrink-0">
                                                {inq.buyerName.charAt(0)}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-gray-900 text-sm">{inq.buyerName}</span>
                                                    <span className="text-xs text-gray-400">• {inq.time}</span>
                                                    <span
                                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${inq.status === 'Unread'
                                                                ? 'bg-blue-50 text-[#1877F2]'
                                                                : 'bg-gray-100 text-gray-600'
                                                            }`}
                                                    >
                                                        {inq.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                                                    <span>Interested in:</span>
                                                    <Link
                                                        href={route('car.details', { slug: inq.carSlug })}
                                                        className="text-[#1877F2] hover:underline"
                                                    >
                                                        {inq.carTitle}
                                                    </Link>
                                                </p>
                                                <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-w-2xl">
                                                    "{inq.message}"
                                                </p>
                                                <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                                                    <span>📞 {inq.buyerPhone}</span>
                                                    <span>•</span>
                                                    <span>✉️ {inq.buyerEmail}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end md:self-center">
                                            <button
                                                type="button"
                                                onClick={() => setReplyModalData(inq)}
                                                className="bg-[#1877F2] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                            >
                                                Reply to Buyer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══ TAB 4: MARKET WATCH & DEALS ════════════════════════ */}
                    {activeTab === 'market' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Market Watch & Recommended Deals</h2>
                                    <p className="text-xs text-gray-500">Live price drops, certified deals, and trending models on CarBazar.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {recommendedCars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="relative rounded-2xl overflow-hidden mb-3 bg-gray-100 h-40">
                                                <img
                                                    src={car.mainImage || car.main_image || '/images/hero-car.jpg'}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2.5 left-2.5 bg-[#EBF3FE] text-[#1877F2] font-bold text-[10px] px-2 py-0.5 rounded-md uppercase">
                                                    {car.brand}
                                                </div>
                                                <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                                    Certified
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{car.name}</h3>
                                            <div className="text-base font-black text-[#1877F2] mb-3">
                                                {car.priceLakh || car.price_lakh || car.askingPrice || car.asking_price}
                                            </div>
                                        </div>
                                        <Link
                                            href={route('car.details', { slug: car.slug })}
                                            className="w-full bg-[#EEF4FF] hover:bg-[#1877F2] hover:text-white text-[#1877F2] py-2 rounded-xl text-center text-xs font-bold transition-all"
                                        >
                                            Inspect Vehicle →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>

                {/* ═══ FULL CAR UPLOAD MODAL (WITH MULTI-STEP, FULL SPECS & REAL PHOTO UPLOAD) ════ */}
                {isPostModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
                        <div className="bg-white rounded-3xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 relative">
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={() => setIsPostModalOpen(false)}
                                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-[#EBF3FE] text-[#1877F2] font-bold text-[11px] px-2.5 py-0.5 rounded-md tracking-wide uppercase">
                                        Sell on CarBazar
                                    </span>
                                    <span className="text-xs text-gray-400">Step {activeStep} of 3</span>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                    Post a Vehicle for Sale
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Provide full vehicle specifications and high-resolution photos for maximum buyer visibility.
                                </p>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveStep(1)}
                                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeStep === 1 ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <span>1. Basic & Pricing</span>
                                </button>
                                <span className="text-gray-300">→</span>
                                <button
                                    type="button"
                                    onClick={() => setActiveStep(2)}
                                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeStep === 2 ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <span>2. Technical Specs</span>
                                </button>
                                <span className="text-gray-300">→</span>
                                <button
                                    type="button"
                                    onClick={() => setActiveStep(3)}
                                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeStep === 3 ? 'bg-[#1877F2] text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <span>3. Photos & Features</span>
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-6">

                                {/* ── STEP 1: Basic & Pricing ── */}
                                {activeStep === 1 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                Vehicle Listing Title *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. 2023 Toyota Land Cruiser Prado TX-L Package"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                            />
                                            {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Brand *
                                                </label>
                                                <select
                                                    value={data.brand}
                                                    onChange={handleBrandChange}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    {brandsWithModels.map((b) => (
                                                        <option key={b.name} value={b.name}>{b.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Model *
                                                </label>
                                                <select
                                                    value={data.model}
                                                    onChange={(e) => {
                                                        const m = e.target.value;
                                                        setData((prev) => ({
                                                            ...prev,
                                                            model: m,
                                                            name: `${prev.year} ${prev.brand} ${m}`,
                                                        }));
                                                    }}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    {availableModels.map((m) => (
                                                        <option key={m} value={m}>{m}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Manufacturing Year *
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    value={data.year}
                                                    onChange={(e) => {
                                                        const y = parseInt(e.target.value) || 2023;
                                                        setData((prev) => ({
                                                            ...prev,
                                                            year: y,
                                                            name: `${y} ${prev.brand} ${prev.model}`,
                                                        }));
                                                    }}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Vehicle Condition *
                                                </label>
                                                <select
                                                    value={data.condition}
                                                    onChange={(e) => setData('condition', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="Reconditioned">Reconditioned (Japan Auction)</option>
                                                    <option value="Brand New">Brand New (0 km)</option>
                                                    <option value="Used / Pre-Owned">Pre-Owned / Used</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Market Category
                                                </label>
                                                <select
                                                    value={data.category}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="popular">Popular Car</option>
                                                    <option value="luxury">Luxury Car</option>
                                                    <option value="family">Family Car</option>
                                                    <option value="off-road">Off-Road / 4x4</option>
                                                    <option value="vintage">Vintage Classic</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Asking Price (BDT) *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. ৳ 45,00,000"
                                                    value={data.asking_price}
                                                    onChange={(e) => setData('asking_price', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => setActiveStep(2)}
                                                className="bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                                            >
                                                Next: Technical Specs →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ── STEP 2: Technical Specifications ── */}
                                {activeStep === 2 && (
                                    <div className="space-y-4 animate-fade-in">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Body Type *
                                                </label>
                                                <select
                                                    value={data.body_type}
                                                    onChange={(e) => setData('body_type', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="SUV">SUV</option>
                                                    <option value="Sedan">Sedan</option>
                                                    <option value="Crossover">Crossover</option>
                                                    <option value="Compact">Compact / Hatchback</option>
                                                    <option value="Coup">Coupe</option>
                                                    <option value="Sport Coupe">Sport Coupe</option>
                                                    <option value="Wagon">Station Wagon</option>
                                                    <option value="Family MBP">Family MPV / Minivan</option>
                                                    <option value="Limousine">Limousine</option>
                                                    <option value="Convertible">Convertible</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Engine Capacity
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 1.8L Hybrid, 2.0L Turbo, 1500cc"
                                                    value={data.engine}
                                                    onChange={(e) => setData('engine', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Fuel Type
                                                </label>
                                                <select
                                                    value={data.fuel_type}
                                                    onChange={(e) => setData('fuel_type', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="Octane">Octane (Petrol)</option>
                                                    <option value="Hybrid">Octane Hybrid</option>
                                                    <option value="Plug-in Hybrid">Plug-in Hybrid (PHEV)</option>
                                                    <option value="Electric">100% Electric (EV)</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="CNG">CNG / LPG</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Transmission
                                                </label>
                                                <select
                                                    value={data.transmission}
                                                    onChange={(e) => setData('transmission', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="Automatic">Automatic (Super CVT-i)</option>
                                                    <option value="Manual">Manual</option>
                                                    <option value="Dual Clutch (DCT)">Dual Clutch (DCT)</option>
                                                    <option value="Single Speed EV">Direct Drive (EV)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Drivetrain / Wheel
                                                </label>
                                                <select
                                                    value={data.drive}
                                                    onChange={(e) => setData('drive', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="FWD">Front-Wheel Drive (FWD)</option>
                                                    <option value="AWD">All-Wheel Drive (AWD)</option>
                                                    <option value="4WD">Four-Wheel Drive (4WD 4x4)</option>
                                                    <option value="RWD">Rear-Wheel Drive (RWD)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Odometer Mileage (km)
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 24,000"
                                                    value={data.mileage}
                                                    onChange={(e) => setData('mileage', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Exterior Color
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Pearl White, Attitude Black"
                                                    value={data.color}
                                                    onChange={(e) => setData('color', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    BRTA Registration Year
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 2023 or Unregistered"
                                                    value={data.registration_year}
                                                    onChange={(e) => setData('registration_year', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Vehicle Location (Area) *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. Gulshan, Dhaka"
                                                    value={data.location}
                                                    onChange={(e) => setData('location', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => setActiveStep(1)}
                                                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveStep(3)}
                                                className="bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                                            >
                                                Next: Photos & Equipment →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ── STEP 3: Equipment Checklist & Photo Upload ── */}
                                {activeStep === 3 && (
                                    <div className="space-y-5 animate-fade-in">
                                        {/* Real File Upload Zone */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                Upload Vehicle Photos (Front, Rear, Interior, Cockpit)
                                            </label>
                                            <div className="border-2 border-dashed border-gray-200 hover:border-[#1877F2] rounded-2xl p-6 text-center transition-colors bg-[#F8FAFC]">
                                                <input
                                                    type="file"
                                                    id="car-photos-upload"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handlePhotoChange}
                                                    className="hidden"
                                                />
                                                <label htmlFor="car-photos-upload" className="cursor-pointer">
                                                    <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center mx-auto mb-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs font-bold text-[#1877F2] hover:underline block">
                                                        Click here to select images from your computer or phone
                                                    </span>
                                                    <span className="text-[11px] text-gray-400 block mt-1">
                                                        Supports JPEG, PNG, WEBP (Max 8MB per file). Select multiple photos.
                                                    </span>
                                                </label>
                                            </div>

                                            {/* Preview Grid */}
                                            {photoPreviews.length > 0 && (
                                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                                                    {photoPreviews.map((p, idx) => (
                                                        <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-200 group h-24 bg-gray-100">
                                                            <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemovePhoto(idx)}
                                                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs hover:bg-rose-600 transition-colors cursor-pointer"
                                                            >
                                                                ✕
                                                            </button>
                                                            {idx === 0 && (
                                                                <span className="absolute bottom-1 left-1 bg-[#1877F2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                                    Main Photo
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Equipment & Features Multi-Select */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                                                Equipment & Premium Features Included
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {equipmentOptions.map((eq) => {
                                                    const isChecked = data.equipment.includes(eq);
                                                    return (
                                                        <button
                                                            key={eq}
                                                            type="button"
                                                            onClick={() => toggleEquipment(eq)}
                                                            className={`text-left px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer ${isChecked
                                                                    ? 'bg-[#EEF4FF] border-[#1877F2] text-[#1877F2]'
                                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${isChecked ? 'bg-[#1877F2] text-white' : 'border border-gray-300'}`}>
                                                                {isChecked ? '✓' : ''}
                                                            </span>
                                                            <span className="truncate">{eq}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Description & Contact */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Seller Contact Phone / WhatsApp *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                    Preset Photo Fallback
                                                </label>
                                                <select
                                                    value={data.preset_image}
                                                    onChange={(e) => setData('preset_image', e.target.value)}
                                                    className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] bg-white"
                                                >
                                                    <option value="/images/corolla-cross-1.jpg">Toyota Corolla Cross</option>
                                                    <option value="/images/hero-car.jpg">Corvette Sport Edition</option>
                                                    <option value="/images/bmw-car.jpg">BMW Performance Sedan</option>
                                                    <option value="/images/audi-car.jpg">Audi RS Avant</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                                Detailed Seller Description
                                            </label>
                                            <textarea
                                                rows="3"
                                                placeholder="Provide inspection grade, tire conditions, battery health, and test drive details..."
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                            ></textarea>
                                        </div>

                                        {/* Submit buttons */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => setActiveStep(2)}
                                                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                            >
                                                ← Back to Specs
                                            </button>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsPostModalOpen(false)}
                                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="bg-[#1877F2] hover:bg-blue-700 text-white px-7 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                                                >
                                                    {processing ? (
                                                        <>
                                                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            <span>Publishing...</span>
                                                        </>
                                                    ) : (
                                                        <span>Publish Car Listing Live</span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </form>
                        </div>
                    </div>
                )}

                {/* ═══ MODAL: REPLY TO BUYER INQUIRY ══════════════════════════ */}
                {replyModalData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 p-6 relative">
                            <button
                                type="button"
                                onClick={() => setReplyModalData(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                            <h3 className="text-lg font-black text-gray-900 mb-1">
                                Reply to {replyModalData.buyerName}
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">
                                Regarding: <strong className="text-gray-800">{replyModalData.carTitle}</strong>
                            </p>

                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-600 mb-4 italic">
                                "{replyModalData.message}"
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                showToast('Response sent to buyer.');
                                setReplyModalData(null);
                            }} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                        Your Response
                                    </label>
                                    <textarea
                                        rows="4"
                                        required
                                        placeholder="Write your response, inspection schedule, or WhatsApp details..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setReplyModalData(null)}
                                        className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#1877F2] hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ═══ FOOTER (Matches CarBazar Design Language) ══════════════ */}
                <footer className="bg-[#0f172a] text-white border-t border-gray-800 mt-16">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-black text-[20px] tracking-tight">CarBazar</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Bangladesh's premier online car buying & selling marketplace. Verified listings, transparent deals, and trusted automotive partnerships.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Quick Navigation</h4>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                    <li><Link href="/#impressive-collection-section" className="hover:text-white transition-colors">Browse Cars</Link></li>
                                    <li><Link href="/#how-it-works-section" className="hover:text-white transition-colors">How It Works</Link></li>
                                    <li><Link href="/#why-choose-us-section" className="hover:text-white transition-colors">Why Choose Us</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Seller Services</h4>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li><button type="button" onClick={() => setIsPostModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">Post Free Car Ad</button></li>
                                    <li><span className="hover:text-white transition-colors cursor-pointer">Verified Inspection</span></li>
                                    <li><span className="hover:text-white transition-colors cursor-pointer">Market Valuation</span></li>
                                    <li><span className="hover:text-white transition-colors cursor-pointer">Instant Cash Offer</span></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Customer Support</h4>
                                <ul className="space-y-2 text-xs text-gray-400">
                                    <li><span>📍 Gulshan-2, Dhaka-1212</span></li>
                                    <li><span>📞 +880 9612-CARBAZAR</span></li>
                                    <li><span>✉️ support@carbazar.com</span></li>
                                    <li><span className="text-emerald-400 font-semibold">24/7 Helpline Available</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
                            © {new Date().getFullYear()} CarBazar. All rights reserved. Exclusively for Buying and Selling Cars.
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
