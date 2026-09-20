import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { getCarBySlug, CARS_DATA, DEFAULT_CAR_SLUG } from '@/data/carsData';

export default function CarDetails({ auth, slug }) {
    const currentSlug = slug || DEFAULT_CAR_SLUG;
    const car = getCarBySlug(currentSlug);

    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    // Reset photo index when car changes
    useEffect(() => {
        setActivePhotoIndex(0);
        setShowPhone(false);
        setIsWishlisted(false);
    }, [currentSlug]);

    const photos = car.photos && car.photos.length > 0 ? car.photos : [
        { src: car.mainImage, thumb: car.mainImage, title: car.name }
    ];

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
        }
    };

    const nextPhoto = () => {
        setActivePhotoIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    // ── Clean SVG Icons for Key Specifications (matching CarBazar design) ──
    const getSpecIcon = (label) => {
        switch (label.toLowerCase()) {
            case 'year':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                );
            case 'condition':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                );
            case 'engine':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.07a4.5 4.5 0 004.486-6.32l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.32 4.486c.09.435.097.886.02 1.32" />
                    </svg>
                );
            case 'fuel type':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 012-2h8a2 2 0 012 2v12H3V8zm12 3h2a2 2 0 012 2v5a2 2 0 002 2h0a2 2 0 002-2v-9l-2-2m-6 0h-8m1 4h6" />
                    </svg>
                );
            case 'body type':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                );
            case 'drive / wheel':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18" />
                    </svg>
                );
            case 'mileage':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                    </svg>
                );
            case 'transmission':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                );
            case 'color':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                );
            case 'interior':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6zm0 0v9m-7.8-4.5L12 12m7.8 4.5L12 12" />
                    </svg>
                );
            case 'registration':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                );
        }
    };

    // ── Clean SVG Icons for Seller's Highlights (NO EMOJIS) ──
    const getHighlightIcon = (type, index) => {
        if (type === 'tech' || index === 1) {
            return (
                <svg className="w-4 h-4 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
            );
        }
        if (type === 'condition' || index === 2) {
            return (
                <svg className="w-4 h-4 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            );
        }
        if (type === 'document' || index === 3) {
            return (
                <svg className="w-4 h-4 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            );
        }
        // Default: Feature / Star
        return (
            <svg className="w-4 h-4 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        );
    };

    // Filter other cars for similar/recommended section
    const otherCars = Object.values(CARS_DATA).filter((c) => c.slug !== car.slug);

    return (
        <>
            <Head title={`${car.name} - CarBazar`} />

            <div className="min-h-screen bg-[#F0F4F8] font-sans">
                {/* ═══ NAVBAR (Matches CarBazar Home Page) ════════════════════ */}
                <header className="bg-white border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[70px]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                </svg>
                            </div>
                            <span className="text-[#1877F2] font-black text-[20px] tracking-tight">CarBazar</span>
                        </Link>

                        {/* Nav Links */}
                        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-gray-700">
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Buy</Link>
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Sell</Link>
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Rental deals</Link>
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">How it works</Link>
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Why choose us</Link>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4 text-[14px] font-semibold">
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="text-gray-800 hover:text-[#1877F2] transition-colors">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-800 hover:text-[#1877F2] transition-colors">
                                        Sign in
                                    </Link>
                                    <Link href={route('register')} className="bg-[#1877F2] hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors text-[13px] font-semibold shadow-sm">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ═══ BREADCRUMB & HEADER ACTIONS ═══════════════════════════ */}
                <div className="bg-white border-b border-gray-200/60 py-3">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <nav className="flex items-center gap-2 text-gray-500 font-medium">
                            <Link href="/" className="hover:text-[#1877F2]">Home</Link>
                            <span>/</span>
                            <Link href="/" className="hover:text-[#1877F2]">Cars</Link>
                            <span>/</span>
                            <span className="hover:text-[#1877F2]">{car.brand}</span>
                            <span>/</span>
                            <span className="text-gray-800 font-bold truncate max-w-[280px] sm:max-w-md">
                                {car.name}
                            </span>
                        </nav>

                        <div className="flex items-center gap-2.5">
                            {/* Wishlist Button */}
                            <button
                                type="button"
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                                    isWishlisted
                                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <svg className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-500'}`} fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{isWishlisted ? 'Saved' : 'Add to Wishlist'}</span>
                            </button>

                            {/* Share Button */}
                            <button
                                type="button"
                                onClick={handleShare}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors"
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ═══ MAIN CONTENT SECTION ══════════════════════════════════ */}
                <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">

                    {/* Top Car Title Bar */}
                    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="bg-[#EBF3FE] text-[#1877F2] font-bold text-[11px] px-2.5 py-0.5 rounded-md tracking-wide uppercase">
                                    {car.brand}
                                </span>
                                <span className="bg-emerald-50 text-emerald-700 font-bold text-[11px] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 fill-emerald-600" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {car.tag || 'Verified Listing'}
                                </span>
                                <span className="text-gray-400 text-xs">• {car.views} views • Published {car.publishedDate}</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-gray-900 tracking-tight">
                                {car.name}
                            </h1>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>{car.location}</span>
                            </div>
                        </div>

                        {/* Mobile Price Display */}
                        <div className="md:hidden bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">Asking Price</span>
                                <div className="text-2xl font-black text-[#1877F2]">
                                    {car.askingPrice}
                                </div>
                            </div>
                            <span className="text-xs bg-blue-50 text-[#1877F2] font-bold px-3 py-1 rounded-full">
                                {car.priceLakh}
                            </span>
                        </div>
                    </div>

                    {/* ═══ TWO COLUMN GRID (Gallery & Details / Sidebar) ═══════ */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ── LEFT COLUMN: Gallery + Specs + Description (8 cols) ── */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* 1. PHOTO GALLERY */}
                            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
                                {/* Big Active Photo Viewport */}
                                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 group flex items-center justify-center">
                                    <img
                                        src={photos[activePhotoIndex]?.src || car.mainImage}
                                        alt={photos[activePhotoIndex]?.title || car.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                                    />

                                    {/* Prev / Next Chevrons */}
                                    {photos.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={prevPhoto}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all backdrop-blur-sm active:scale-95"
                                                aria-label="Previous photo"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={nextPhoto}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all backdrop-blur-sm active:scale-95"
                                                aria-label="Next photo"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    {/* Photo Counter Pill */}
                                    <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        <span>{activePhotoIndex + 1} / {photos.length} Photos</span>
                                    </div>
                                </div>

                                {/* Thumbnails Row */}
                                {photos.length > 1 && (
                                    <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4">
                                        {photos.map((p, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setActivePhotoIndex(idx)}
                                                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all group ${
                                                    activePhotoIndex === idx
                                                        ? 'border-[#1877F2] ring-2 ring-[#1877F2]/30 shadow-md scale-[1.02]'
                                                        : 'border-transparent opacity-75 hover:opacity-100'
                                                }`}
                                            >
                                                <img src={p.thumb} alt={p.title} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 2. KEY SPECIFICATIONS */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <div className="w-2 h-6 bg-[#1877F2] rounded-full"></div>
                                        Key Specifications
                                    </h2>
                                    <span className="text-xs font-semibold text-gray-400">
                                        {car.name}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                                    {car.keySpecifications.map((spec, i) => (
                                        <div
                                            key={i}
                                            className="bg-[#F8FAFC] hover:bg-[#EEF4FF] rounded-2xl p-3.5 border border-gray-100 transition-colors flex items-center gap-3 group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white flex items-center justify-center shrink-0 shadow-sm transition-colors">
                                                {getSpecIcon(spec.label)}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 truncate leading-none mb-1">
                                                    {spec.label}
                                                </div>
                                                <div className="font-bold text-[13px] sm:text-[14px] text-gray-900 truncate">
                                                    {spec.value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. SELLER'S COMMENT & DESCRIPTION */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-6 bg-[#1877F2] rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900">Seller's Comment</h2>
                                </div>

                                <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 mb-5">
                                    <h3 className="text-[15px] font-bold text-[#1877F2] mb-1">
                                        {car.headline}
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {car.description}
                                    </p>
                                </div>

                                {/* Clean Highlights with professional SVG icon containers (No Emojis) */}
                                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                                    {car.highlights.map((h, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50/80 transition-colors">
                                            <div className="w-8 h-8 rounded-xl bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                                                {getHighlightIcon(h.type, i)}
                                            </div>
                                            <div className="flex-1">
                                                <strong className="text-gray-900 font-bold block sm:inline mr-1.5">{h.title}:</strong>
                                                <span className="text-gray-600 text-xs sm:text-sm">{h.text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4. FEATURES & EQUIPMENT CHECKLIST */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2 h-6 bg-[#1877F2] rounded-full"></div>
                                    <h2 className="text-xl font-bold text-gray-900">Features & Equipment</h2>
                                </div>

                                <div className="space-y-6">
                                    {car.equipmentList.map((section, idx) => (
                                        <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]"></span>
                                                {section.category}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                                {section.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="flex items-center gap-2.5 text-xs font-medium text-gray-700 bg-gray-50/80 hover:bg-blue-50/60 px-3 py-2.5 rounded-xl border border-gray-100/80 transition-colors">
                                                        <div className="w-4 h-4 rounded-full bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
                                                            <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>
                                                        </div>
                                                        <span className="truncate">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* ── RIGHT COLUMN: Sticky Price & Seller Contact Card (4 cols) ── */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

                            {/* Price & Summary Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Fixed / Slightly Negotiable
                                    </span>
                                    <span className="bg-blue-50 text-[#1877F2] font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
                                        BDT Price
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                                        {car.askingPrice}
                                    </span>
                                </div>

                                <div className="text-xs text-gray-500 font-medium mb-5 pb-5 border-b border-gray-100 flex items-center justify-between">
                                    <span>Equivalent to: <strong>{car.priceLakh}</strong></span>
                                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Ready Delivery
                                    </span>
                                </div>

                                {/* Quick Chips with Clean Line Icons */}
                                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600 mb-6">
                                    <div className="bg-gray-50 p-2.5 rounded-xl text-center flex flex-col items-center justify-center">
                                        <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>
                                            Year
                                        </div>
                                        {car.year}
                                    </div>
                                    <div className="bg-gray-50 p-2.5 rounded-xl text-center flex flex-col items-center justify-center">
                                        <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>
                                            Mileage
                                        </div>
                                        {car.keySpecifications.find(s => s.label === 'Mileage')?.value || '20,000 km'}
                                    </div>
                                    <div className="bg-gray-50 p-2.5 rounded-xl text-center flex flex-col items-center justify-center">
                                        <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 012-2h8a2 2 0 012 2v12H3V8zm12 3h2a2 2 0 012 2v5a2 2 0 002 2" /></svg>
                                            Fuel
                                        </div>
                                        {car.keySpecifications.find(s => s.label === 'Fuel Type')?.value || 'Octane'}
                                    </div>
                                    <div className="bg-gray-50 p-2.5 rounded-xl text-center flex flex-col items-center justify-center">
                                        <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-0.5">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4" /></svg>
                                            Transmission
                                        </div>
                                        {car.type || 'Auto'}
                                    </div>
                                </div>

                                {/* Seller Info Card */}
                                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 mb-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-[#1877F2] text-white font-black text-lg flex items-center justify-center shadow-md">
                                            {car.seller.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <h4 className="font-bold text-gray-900 text-[15px] truncate">
                                                    {car.seller.name}
                                                </h4>
                                                <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="text-xs text-gray-500">{car.seller.role} • {car.seller.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200/60">
                                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                                            <svg className="w-3.5 h-3.5 fill-current text-yellow-400" viewBox="0 0 20 20">
                                                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                                            </svg>
                                            {car.seller.rating} <span className="text-gray-400 font-normal">({car.seller.reviewsCount} reviews)</span>
                                        </span>
                                        <span className="text-gray-400">Member since {car.seller.memberSince}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    {/* Call Seller Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPhone(!showPhone)}
                                        className="w-full bg-[#1877F2] hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <span>{showPhone ? car.seller.phone : 'Call the seller'}</span>
                                    </button>

                                    {/* Connect on WhatsApp */}
                                    <a
                                        href={`https://wa.me/${car.seller.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I am interested in the ${car.name} on CarBazar`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-[#25D366] hover:bg-[#1ebc57] text-white py-3.5 px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.97.545 1.761.815 2.796.815 3.183 0 5.769-2.586 5.77-5.766.001-3.181-2.585-5.801-5.77-5.801zm3.364 8.232c-.147.414-.757.771-1.049.82-.292.049-.668.08-1.928-.445-1.579-.658-2.6-2.28-2.678-2.385-.078-.105-.639-.851-.639-1.624 0-.773.404-1.154.549-1.311.144-.157.316-.197.422-.197.106 0 .212.002.305.007.098.005.23-.037.36.275.132.312.449 1.096.488 1.176.04.08.066.173.013.278-.053.105-.08.172-.159.265-.079.093-.166.208-.237.28-.08.08-.163.167-.07.327.093.16.413.681.887 1.103.61.543 1.123.711 1.282.791.16.08.252.067.346-.041.093-.107.4-.467.507-.627.107-.16.213-.133.36-.08.147.053.929.438 1.088.518.16.08.266.12.306.187.04.067.04.387-.107.801z" />
                                        </svg>
                                        <span>Connect on WhatsApp</span>
                                    </a>
                                </div>
                            </div>

                            {/* Safety Tips Card with Clean Emerald Shield Icon */}
                            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-gray-100">
                                <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-sm">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    Buyer Safety Checklist
                                </div>
                                <ul className="space-y-3 text-xs text-gray-600">
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <span>Never transfer money or pay advance before seeing the car in person.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <span>Meet the seller at a safe, public place or verified showroom.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <span>Inspect BRTA registration papers, tax token & fitness validity.</span>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>

                    {/* ═══ SIMILAR CARS IN DHAKA ═════════════════════════════════ */}
                    <section className="mt-16 pt-8 border-t border-gray-200/70">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2] bg-blue-50 px-3 py-1 rounded-md mb-2 inline-block">
                                    More Recommendations
                                </span>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                    Buy Similar Vehicles in Dhaka
                                </h2>
                            </div>
                            <Link
                                href="/"
                                className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#1877F2] hover:underline"
                            >
                                <span>View all cars</span>
                                <span className="text-base leading-none">→</span>
                            </Link>
                        </div>

                        {/* Cars Grid Matching CarBazar Home Page Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {otherCars.slice(0, 4).map((otherCar) => (
                                <div
                                    key={otherCar.slug}
                                    className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-gray-100 p-4 flex flex-col transition-all duration-200 group"
                                >
                                    <div className="h-[130px] mb-3 flex items-center justify-center relative overflow-hidden rounded-xl bg-gray-50">
                                        <img
                                            src={otherCar.mainImage}
                                            alt={otherCar.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#EBF3FE] text-[#1877F2] px-2 py-0.5 rounded-md">
                                            {otherCar.tag}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-gray-900 text-[14px] mb-1 truncate">
                                        {otherCar.name}
                                    </h3>
                                    <p className="text-[11px] text-gray-400 mb-2 truncate">
                                        {otherCar.location}
                                    </p>

                                    {/* Features Chips */}
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mb-3">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded">{otherCar.year}</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded">{otherCar.brand}</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded">{otherCar.type}</span>
                                    </div>

                                    <div className="border-t border-gray-100 my-2"></div>

                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-[11px] font-medium">Price</span>
                                        <div className="font-bold text-[14px] text-gray-900">
                                            {otherCar.askingPrice}
                                        </div>
                                    </div>

                                    {/* View Details Button with Blue Hover Effect */}
                                    <Link
                                        href={`/car/${otherCar.slug}`}
                                        className="w-full py-2.5 rounded-xl border border-[#1877F2] text-[#1877F2] bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-md hover:shadow-blue-500/20 font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all duration-200 group/btn"
                                    >
                                        <span>View Details</span>
                                        <span className="text-base leading-none group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ═══ MORE CAR SALES IN BANGLADESH CATEGORIES (CLEAN SVG ICONS) ═══ */}
                    <section className="mt-14 mb-8">
                        <h3 className="text-base font-bold text-gray-900 mb-4">
                            More Car Sales in Bangladesh
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Petrol Cars */}
                            <Link
                                href="/"
                                className="bg-white rounded-2xl p-4 border border-gray-200/70 hover:border-[#1877F2] hover:shadow-md shadow-sm flex items-center justify-between transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center font-bold">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 012-2h8a2 2 0 012 2v12H3V8zm12 3h2a2 2 0 012 2v5a2 2 0 002 2h0a2 2 0 002-2v-9l-2-2m-6 0h-8m1 4h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                            Explore Used Petrol Cars
                                        </h4>
                                        <p className="text-[10px] text-gray-400">18,500+ cars available</p>
                                    </div>
                                </div>
                                <span className="text-gray-400 group-hover:text-[#1877F2] text-sm group-hover:translate-x-1 transition-all">↗</span>
                            </Link>

                            {/* Hybrid & Electric */}
                            <Link
                                href="/"
                                className="bg-white rounded-2xl p-4 border border-gray-200/70 hover:border-[#1877F2] hover:shadow-md shadow-sm flex items-center justify-between transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                            Browse Used Hybrid / Electric
                                        </h4>
                                        <p className="text-[10px] text-gray-400">4,200+ eco cars available</p>
                                    </div>
                                </div>
                                <span className="text-gray-400 group-hover:text-[#1877F2] text-sm group-hover:translate-x-1 transition-all">↗</span>
                            </Link>

                            {/* Brand New Cars */}
                            <Link
                                href="/"
                                className="bg-white rounded-2xl p-4 border border-gray-200/70 hover:border-[#1877F2] hover:shadow-md shadow-sm flex items-center justify-between transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                            Explore Brand New Cars
                                        </h4>
                                        <p className="text-[10px] text-gray-400">Direct from authorized dealers</p>
                                    </div>
                                </div>
                                <span className="text-gray-400 group-hover:text-[#1877F2] text-sm group-hover:translate-x-1 transition-all">↗</span>
                            </Link>
                        </div>
                    </section>

                </main>

                {/* ═══ FOOTER (Matches CarBazar Home Page Exactly) ════════════ */}
                <footer className="bg-[#051C34] text-white pt-16 pb-8 border-t border-[#0e2c4d]">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row justify-between gap-10 pb-16">
                            {/* Column 1: Brand info */}
                            <div className="max-w-[280px]">
                                <Link href="/" className="flex items-center gap-2 mb-5">
                                    <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-black text-[20px] tracking-tight">CarBazar</span>
                                </Link>

                                <div className="space-y-2 text-[13px] text-slate-300/90 font-normal">
                                    <div className="flex items-start gap-2.5">
                                        <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span>Dhaka, Bangladesh</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        <span>+880 1712-345678</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        <span>support@carbazar.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Our Product */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Our Product</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><Link href="/" className="hover:text-white transition-colors">Career</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Car</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Packages</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Features</Link></li>
                                </ul>
                            </div>

                            {/* Column 3: Resources */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Resources</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><Link href="/" className="hover:text-white transition-colors">Download</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Help Centre</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Guides</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Cruises</Link></li>
                                </ul>
                            </div>

                            {/* Column 4: About CarBazar */}
                            <div className="min-w-[130px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">About CarBazar</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><Link href="/" className="hover:text-white transition-colors">Why choose us</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Our Story</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Press Center</Link></li>
                                    <li><Link href="/" className="hover:text-white transition-colors">Advertise</Link></li>
                                </ul>
                            </div>

                            {/* Column 5: Follow Us */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Follow Us</h4>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <a href="#" className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03.7-1.5 1.5-1.5H18V2.3c-.6-.08-1.5-.15-2.6-.15-2.7 0-4.4 1.6-4.4 4.6v2.75H8v4h3V22h3v-8.5z" /></svg>
                                    </a>
                                    <a href="#" className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors">
                                        <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" /></svg>
                                    </a>
                                    <a href="#" className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors">
                                        <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="4" ry="4" /><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Copyright */}
                        <div className="border-t border-[#0e2c4d] pt-8 text-center w-full">
                            <p className="text-slate-300/80 text-[13px] font-normal tracking-wide">
                                Copyright 2024 • CarBazar, All Rights Reserved
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
