import { Head, Link } from '@inertiajs/react';
import HeroCarFilter from '@/Components/HeroCarFilter';

// ─── Car Category SVG icons ───────────────────────────────────────────────────
const SedanIcon = () => (
    <svg viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-8">
        <path d="M4 22h56v4H4z" fill="#CBD5E1" />
        <path d="M10 22c0-4 2-10 8-12h18c6 2 10 8 10 12H10z" fill="#94A3B8" />
        <path d="M18 10h18l4 8H14l4-8z" fill="#64748B" />
        <circle cx="16" cy="24" r="4" fill="#334155" />
        <circle cx="48" cy="24" r="4" fill="#334155" />
        <circle cx="16" cy="24" r="2" fill="#94A3B8" />
        <circle cx="48" cy="24" r="2" fill="#94A3B8" />
    </svg>
);
const SuvIcon = () => (
    <svg viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-8">
        <path d="M4 20h56v6H4z" fill="#CBD5E1" />
        <path d="M8 20c0-5 2-12 8-14h24c6 2 8 9 8 14H8z" fill="#94A3B8" />
        <path d="M16 6h22l4 10H12l4-10z" fill="#64748B" />
        <circle cx="16" cy="24" r="4" fill="#334155" />
        <circle cx="48" cy="24" r="4" fill="#334155" />
        <circle cx="16" cy="24" r="2" fill="#94A3B8" />
        <circle cx="48" cy="24" r="2" fill="#94A3B8" />
    </svg>
);
const SportsIcon = () => (
    <svg viewBox="0 0 64 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-7">
        <path d="M2 20h60v4H2z" fill="#CBD5E1" />
        <path d="M6 20C6 16 10 8 18 7h22c8 1 14 7 14 13H6z" fill="#94A3B8" />
        <path d="M14 7h26l6 9H8l6-9z" fill="#64748B" />
        <circle cx="14" cy="22" r="4" fill="#334155" />
        <circle cx="50" cy="22" r="4" fill="#334155" />
        <circle cx="14" cy="22" r="2" fill="#94A3B8" />
        <circle cx="50" cy="22" r="2" fill="#94A3B8" />
    </svg>
);

// ─── Brand Logo SVGs ──────────────────────────────────────────────────────────
const ToyotaLogo = () => (
    <svg viewBox="0 0 100 40" className="h-8 w-auto" fill="#1a1a1a">
        <ellipse cx="50" cy="20" rx="20" ry="12" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <ellipse cx="50" cy="20" rx="10" ry="18" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <ellipse cx="50" cy="9" rx="28" ry="5" stroke="#1a1a1a" strokeWidth="3" fill="none" />
    </svg>
);
const HondaLogo = () => (
    <svg viewBox="0 0 100 50" className="h-8 w-auto" fill="none">
        <path d="M30 10 L30 40 L40 40 L40 28 L60 28 L60 40 L70 40 L70 10 L60 10 L60 22 L40 22 L40 10 Z" fill="#1a1a1a" />
    </svg>
);
const BMWLogoSvg = () => (
    <svg viewBox="0 0 50 50" className="h-8 w-8" fill="none">
        <circle cx="25" cy="25" r="23" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M25 2 A23 23 0 0 1 48 25 L25 25 Z" fill="#1565C0" />
        <path d="M25 48 A23 23 0 0 1 2 25 L25 25 Z" fill="#1565C0" />
        <path d="M2 25 A23 23 0 0 1 25 2 L25 25 Z" fill="white" />
        <path d="M48 25 A23 23 0 0 1 25 48 L25 25 Z" fill="white" />
        <circle cx="25" cy="25" r="8" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
        <text x="25" y="29" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1a1a1a">BMW</text>
    </svg>
);
const AudiLogoSvg = () => (
    <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
        <circle cx="20" cy="20" r="15" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <circle cx="40" cy="20" r="15" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <circle cx="60" cy="20" r="15" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <circle cx="80" cy="20" r="15" stroke="#1a1a1a" strokeWidth="3" fill="none" />
    </svg>
);
const MercedesLogo = () => (
    <svg viewBox="0 0 50 50" className="h-8 w-8" fill="none">
        <circle cx="25" cy="25" r="23" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M25 4 L25 25 L9 38" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M25 4 L25 25 L41 38" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M9 38 L41 38" stroke="#1a1a1a" strokeWidth="2" />
    </svg>
);
const NissanLogo = () => (
    <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
        <ellipse cx="60" cy="20" rx="55" ry="16" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <line x1="5" y1="20" x2="115" y2="20" stroke="#1a1a1a" strokeWidth="3" />
        <circle cx="60" cy="20" r="10" stroke="#1a1a1a" strokeWidth="3" fill="none" />
    </svg>
);
const LexusLogo = () => (
    <svg viewBox="0 0 60 50" className="h-8 w-auto" fill="none">
        <ellipse cx="30" cy="25" rx="25" ry="20" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <path d="M15 25 Q30 10 45 25" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <text x="30" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a1a1a">L</text>
    </svg>
);
const KiaLogo = () => (
    <svg viewBox="0 0 100 40" className="h-8 w-auto" fill="none">
        <text x="50" y="30" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1a1a1a" fontStyle="italic">KIA</text>
    </svg>
);
const HyundaiLogo = () => (
    <svg viewBox="0 0 80 50" className="h-8 w-auto" fill="none">
        <ellipse cx="40" cy="25" rx="36" ry="20" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <text x="40" y="31" textAnchor="middle" fontSize="22" fontWeight="bold" fontStyle="italic" fill="#1a1a1a">H</text>
    </svg>
);
const TeslaLogo = () => (
    <svg viewBox="0 0 80 50" className="h-8 w-auto" fill="none">
        <path d="M40 10 L40 45" stroke="#1a1a1a" strokeWidth="3" />
        <path d="M20 18 L60 18" stroke="#1a1a1a" strokeWidth="3" />
        <path d="M20 18 Q20 10 40 10 Q60 10 60 18" stroke="#1a1a1a" strokeWidth="3" fill="none" />
    </svg>
);

// ─── Star Rating ──────────────────────────────────────────────────────────────
const Stars = ({ count = 5 }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
            </svg>
        ))}
    </div>
);

// ─── Car Card for Collection ──────────────────────────────────────────────────
const CarCard = ({ image, name, slug = 'toyota-corolla-cross-hybrid-2021', price, rating, reviews, passengers, doors }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
        <img src={image} alt={name} className="w-full h-[120px] object-contain mb-3" />

        <h3 className="font-bold text-[15px] text-gray-900 mb-1 truncate">{name}</h3>

        <div className="flex items-center gap-1 mb-4">
            <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
            </svg>
            <span className="font-bold text-[11px] text-gray-900">{rating}</span>
            <span className="text-[11px] text-gray-400">({reviews} reviews)</span>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-4 mt-auto">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {passengers} Passagers
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                Auto
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Air Conditioning
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                {doors} Doors
            </div>
        </div>

        <div className="border-t border-gray-100 mb-4"></div>

        <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] text-gray-500 font-medium">Price</span>
            <div>
                <span className="font-bold text-[15px] text-gray-900">৳{price}</span>
                <span className="text-[11px] text-gray-500"> /day</span>
            </div>
        </div>

        <Link
            href={`/car/${slug}`}
            className="w-full py-2.5 rounded-xl border border-[#1877F2] text-[#1877F2] bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-md hover:shadow-blue-500/20 font-bold text-[13px] transition-all duration-200 flex items-center justify-center gap-1.5 group"
        >
            <span>View Details</span>
            <span className="text-base leading-none group-hover:translate-x-1 transition-transform">→</span>
        </Link>
    </div>
);

export default function Welcome({ auth }) {
    const carCategories = [
        { label: 'Sedan', icon: <SedanIcon /> },
        { label: 'SUV', icon: <SuvIcon /> },
        { label: 'Sports', icon: <SportsIcon /> },
        { label: 'Coupe', icon: <SedanIcon /> },
        { label: 'Pickup', icon: <SuvIcon /> },
    ];

    const collectionCars = [
        { image: '/images/corolla-cross-1.jpg', name: 'Toyota Corolla Cross Hybrid', slug: 'toyota-corolla-cross-hybrid-2021', price: '2,500', rating: '4.9', reviews: '2,436', passengers: '5', doors: '4' },
        { image: '/images/hero-car.jpg', name: 'Jaguar XE L P250', slug: 'jaguar-xe-l-p250', price: '1,800', rating: '4.8', reviews: '2,436', passengers: '4', doors: '4' },
        { image: '/images/audi-car.jpg', name: 'Audi R8 Performance', slug: 'audi-r8', price: '2,100', rating: '4.6', reviews: '1,936', passengers: '2', doors: '2' },
        { image: '/images/bmw-car.jpg', name: 'BMW M3 Competition', slug: 'bmw-m3', price: '1,600', rating: '4.5', reviews: '2,036', passengers: '4', doors: '4' },
        { image: '/images/lamborghini-car.jpg', name: 'Lamborghini Huracán EVO', slug: 'lamborghini-huracan', price: '2,300', rating: '4.3', reviews: '2,236', passengers: '2', doors: '2' },

        { image: '/images/bmw-car.jpg', name: 'BMW M3 Competition', slug: 'bmw-m3', price: '1,600', rating: '4.5', reviews: '2,036', passengers: '4', doors: '4' },
        { image: '/images/hero-car.jpg', name: 'Jaguar XE L P250', slug: 'jaguar-xe-l-p250', price: '1,800', rating: '4.8', reviews: '2,436', passengers: '4', doors: '4' },
        { image: '/images/lamborghini-car.jpg', name: 'Lamborghini Huracán EVO', slug: 'lamborghini-huracan', price: '2,300', rating: '4.3', reviews: '2,236', passengers: '2', doors: '2' },
        { image: '/images/corolla-cross-1.jpg', name: 'Toyota Corolla Cross Hybrid', slug: 'toyota-corolla-cross-hybrid-2021', price: '2,500', rating: '4.9', reviews: '2,436', passengers: '5', doors: '4' },
        { image: '/images/audi-car.jpg', name: 'Audi R8 Performance', slug: 'audi-r8', price: '2,100', rating: '4.6', reviews: '1,936', passengers: '2', doors: '2' },
    ];

    const testimonials = [
        {
            avatar: '/images/avatar-1.jpg',
            name: 'Serhiy Hipskyy',
            role: 'CEO',
            company: 'Universal',
            text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and.',
            rating: 5,
        },
        {
            avatar: '/images/avatar-2.jpg',
            name: 'Justus Menke',
            role: 'CEO',
            company: 'Eronaman',
            text: 'Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
            rating: 5,
        },
        {
            avatar: '/images/avatar-3.jpg',
            name: 'Britain Eriksen',
            role: 'CEO',
            company: 'Universal',
            text: 'Accusamus et iusto odi ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
            rating: 5,
        },
        {
            avatar: '/images/avatar-3.jpg',
            name: 'Britain Eriksen',
            role: 'CEO',
            company: 'Universal',
            text: 'Accusamus et iusto odi ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
            rating: 5,
        },
    ];

    return (
        <>
            <Head title="CarBazar - Buy or Sell your CARS & BIKE" />

            <div className="min-h-screen bg-[#F0F4F8] font-sans">

                {/* ═══ HERO WRAPPER (Navbar + Hero combined) ═════════════════ */}
                <div
                    className="relative w-full"
                    style={{
                        background: '#f2f4f6',
                        minHeight: '84vh',
                    }}
                >
                    {/* ── Car Image — no container boundaries, blends into bg ── */}
                    <div className="absolute inset-0 z-10 flex items-center justify-end pointer-events-none">
                        <img
                            src="/images/hero-car.png"
                            alt="SUV Car"
                            style={{
                                width: '70%',
                                height: '100%',
                                objectFit: 'contain',
                                objectPosition: 'right center',
                            }}
                        />
                    </div>

                    {/* ── Navbar ── */}
                    <nav className="relative z-40 w-full">
                        <div className="w-full px-8 lg:px-16 flex items-center justify-between h-[70px]">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                    </svg>
                                </div>
                                <span className="text-[#1877F2] font-black text-[18px] tracking-tight">CarBazar</span>
                            </div>

                            {/* Nav Links */}
                            <div className="hidden lg:flex items-center gap-9 text-[14px] font-semibold text-gray-800">
                                <a href="#" className="hover:text-[#1877F2] transition-colors">Buy</a>
                                <a href="#" className="hover:text-[#1877F2] transition-colors">Sell</a>
                                <a href="#" className="hover:text-[#1877F2] transition-colors">Rental deals</a>
                                <a href="#" className="hover:text-[#1877F2] transition-colors">How it work</a>
                                <a href="#" className="hover:text-[#1877F2] transition-colors">Why choose us</a>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-5 text-[14px] font-semibold">
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="text-gray-800 hover:text-[#1877F2] transition-colors">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-800 hover:text-[#1877F2] transition-colors">Sign in</Link>
                                        <Link href={route('register')} className="bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors text-[13px] font-semibold">Sign up</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>

                    {/* ── Hero Text Content ── */}
                    <div className="relative z-30 px-8 lg:px-16 pt-10 pb-32">
                        <div className="max-w-[500px]">
                            <h1 className="font-bold text-gray-900 leading-[1.1] tracking-tight">
                                <span className="block text-[2rem] lg:text-[2.6rem]">Buy or Sell your</span>
                                <span className="block text-[3.2rem] lg:text-[4.0rem] text-[#1877F2] font-black uppercase">CARS &amp; BIKE</span>
                            </h1>
                            <p className="text-gray-900 mt-5 text-[15px] leading-relaxed max-w-[380px] font-medium">
                                Lorem ipsum dolor sit amet consectetur. Volutpat amet proin integer
                                potenti. Purus maecenas sed aliquet enim ultrices facilisis sollicitudin sit.
                                Non facilisis gravida integer elementum ornare nisl enim.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 w-full max-w-[270px]">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] placeholder-gray-400 text-sm bg-white"
                                />
                                <button className="w-full bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors">
                                    Sign up free <span className="text-base font-bold">→</span>
                                </button>
                            </div>

                            <div className="mt-7 flex items-center gap-3">
                                <button className="flex items-center gap-2.5 border border-gray-300 bg-white rounded-full px-4 py-2 hover:bg-gray-50 transition shadow-sm">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.307 10.155c-.035-2.263 1.849-3.376 1.936-3.428-1.048-1.534-2.678-1.745-3.262-1.767-1.391-.14-2.716.82-3.423.82-.705 0-1.792-.801-2.934-.778-1.493.022-2.871.868-3.636 2.203-1.554 2.689-.398 6.666 1.116 8.847.74 1.066 1.621 2.26 2.76 2.217 1.089-.044 1.503-.706 2.822-.706 1.317 0 1.69.706 2.844.685 1.176-.022 1.936-1.09 2.652-2.13 3.655-5.32 1.488-8.204 1.488-8.204-.022-.014-2.316-.9-2.363-3.623zM12.441 4.793c.602-.728 1.008-1.738.898-2.747-1.094.044-2.29.728-2.915 1.457-.552.635-1.042 1.66-.91 2.648 1.206.094 2.324-.627 2.927-1.358z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-[9px] leading-tight text-gray-500 font-semibold">Download on the</div>
                                        <div className="text-[12px] font-bold leading-tight text-gray-900">App Store</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-2.5 border border-gray-300 bg-white rounded-full px-4 py-2 hover:bg-gray-50 transition shadow-sm">
                                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.984 1.984 0 01-.61-1.442V3.256c0-.554.218-1.077.609-1.442z" />
                                        <path d="M13.792 12l3.415-3.415L4.542 1.26a1.983 1.983 0 00-1.854-.092L13.792 12z" />
                                        <path d="M17.207 15.415L13.792 12 2.688 23.104a1.982 1.982 0 001.854-.092l12.665-7.597z" />
                                        <path d="M17.207 15.415l4.316-2.589a1.984 1.984 0 000-3.414l-4.316-2.589-3.415 3.415 3.415 3.415z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-[9px] leading-tight text-gray-500 font-semibold">GET IT ON</div>
                                        <div className="text-[12px] font-bold leading-tight text-gray-900">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Search / Filter Bar (Brands, Model, Price Range, Condition) ── */}
                    <div className="absolute -bottom-14 sm:-bottom-12 left-1/2 -translate-x-1/2 w-[95%] max-w-[1150px] z-40">
                        <HeroCarFilter
                            onSearch={(filters) => {
                                const el = document.getElementById('cars-section');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        />
                    </div>
                </div>

                {/* ═══ POPULAR RENTAL DEALS ══════════════════════════════════ */}
                <section id="cars-section" className="bg-white pt-32 pb-4">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                        {/* Section Header */}
                        <div className="flex flex-col items-center justify-center text-center mb-12">
                            <div className="bg-[#EBF3FE] text-[#1877F2] font-bold text-[11px] px-4 py-2 rounded-md tracking-wide mb-4">
                                POPULAR RENTAL DEALS
                            </div>
                            <h2 className="text-[2rem] font-bold text-gray-900">
                                Most popular cars rental deals
                            </h2>
                        </div>

                        {/* Cars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[
                                { name: 'Toyota Corolla Cross Hybrid', slug: 'toyota-corolla-cross-hybrid-2021', rating: '4.9', reviews: '2,436', passengers: 5, type: 'Auto', ac: true, doors: 4, price: '2,500', img: '/images/corolla-cross-1.jpg' },
                                { name: 'Jaguar XE L P250', slug: 'jaguar-xe-l-p250', rating: '4.8', reviews: '2,436', passengers: 4, type: 'Auto', ac: true, doors: 4, price: '1,800', img: '/images/hero-car.jpg' },
                                { name: 'Audi R8', slug: 'audi-r8', rating: '4.6', reviews: '1,936', passengers: 2, type: 'Auto', ac: true, doors: 2, price: '2,100', img: '/images/audi-car.jpg' },
                                { name: 'BMW M3', slug: 'bmw-m3', rating: '4.5', reviews: '2,036', passengers: 4, type: 'Auto', ac: true, doors: 4, price: '1,600', img: '/images/bmw-car.jpg' },
                                { name: 'Lamborghini Huracán', slug: 'lamborghini-huracan', rating: '4.3', reviews: '2,236', passengers: 2, type: 'Auto', ac: true, doors: 2, price: '2,300', img: '/images/lamborghini-car.jpg' },
                            ].map((car, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 p-4 flex flex-col hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                                    <div className="h-[100px] mb-3 flex items-center justify-center">
                                        <img src={car.img} alt={car.name} className="max-h-full object-contain" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-[14px] mb-0.5 truncate">{car.name}</h3>
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <svg className="w-3.5 h-3.5 text-[#FFC107]" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-bold text-gray-900 text-[11px]">{car.rating}</span>
                                        <span className="text-gray-400 text-[10px]">({car.reviews} reviews)</span>
                                    </div>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-1.5 mb-3">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            <span className="text-[10px] font-medium">{car.passengers} Passagers</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                            <span className="text-[10px] font-medium">{car.type}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                            <span className="text-[10px] font-medium">Air Conditioning</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                                            <span className="text-[10px] font-medium">{car.doors} Doors</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 my-2.5"></div>

                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-[11px] font-medium">Price</span>
                                        <div className="font-bold text-[14px] text-gray-900">
                                            ৳{car.price} <span className="text-gray-400 text-[11px] font-normal">/day</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/car/${car.slug}`}
                                        className="w-full py-2.5 rounded-xl border border-[#1877F2] text-[#1877F2] bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-md hover:shadow-blue-500/20 font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all duration-200 group"
                                    >
                                        <span>View Details</span>
                                        <span className="text-base leading-none group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-2.5 text-gray-600 font-semibold text-[13px] hover:bg-gray-50 transition-colors">
                                Show all vehicles <span className="text-lg leading-none">→</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ═══ HOW IT WORKS ══════════════════════════════════════════ */}
                <section className="bg-white pt-4 pb-20 overflow-hidden">
                    <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
                        {/* Section Header */}
                        <div className="flex flex-col items-center text-center mb-16">
                            <h2 className="text-[2.2rem] font-bold text-gray-900 mb-4 tracking-tight">How it works</h2>
                            <p className="text-gray-800 font-bold text-[14px] leading-relaxed max-w-2xl">
                                Renting a luxury car has never been easier. Our streamlined process makes it simple<br className="hidden md:block" /> for you to book and confirm your vehicle of choice online
                            </p>
                        </div>

                        {/* Content */}
                        <div className="relative flex flex-col lg:flex-row items-center">

                            {/* Jeep Image replacing blue bg div */}
                            <div className="hidden lg:block absolute -right-8 top-[-20px] bottom-[-20px] w-[65%] rounded-3xl z-0 overflow-hidden">
                                <img
                                    src="/images/jeep-car.jpg"
                                    alt="Jeep Wrangler"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </div>

                            {/* Left: Cards */}
                            <div className="lg:w-[45%] z-10 w-full space-y-4 pt-8 lg:pt-0 lg:-ml-6">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        ),
                                        title: 'Browse and select',
                                        desc: 'Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best.'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2 2 4-4" /></svg>
                                        ),
                                        title: 'Book and confirm',
                                        desc: 'Book your desired car with just a few clicks and receive an instant confirmation via email or SMS.'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        ),
                                        title: 'Enjoy your ride',
                                        desc: 'Pick up your car at the designated location and enjoy your premium driving experience with our top-quality service.'
                                    }
                                ].map((step, i) => (
                                    <div key={i} className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 lg:p-7 flex gap-5 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-[#E5EFFB] flex items-center justify-center flex-shrink-0 mt-1">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-[17px] mb-2">{step.title}</h3>
                                            <p className="text-gray-800 font-semibold text-[13px] leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* ═══ RENT BY BRANDS & BODY TYPE ════════════════════════════ */}
                <section className="bg-white py-14">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

                        {/* ── Rent by Brands ── */}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[1.35rem] font-bold text-gray-900">Rent by Brands</h2>
                            <button className="flex items-center gap-1.5 text-gray-600 font-semibold text-[13px] hover:text-gray-900 transition-colors">
                                View all <span className="text-lg leading-none">→</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 mb-12">
                            {[
                                {
                                    name: 'Toyota',
                                    logo: <svg viewBox="0 0 100 100" className="w-10 h-10"><ellipse cx="50" cy="50" rx="45" ry="18" fill="none" stroke="currentColor" strokeWidth="5" /><ellipse cx="50" cy="50" rx="23" ry="45" fill="none" stroke="currentColor" strokeWidth="5" /><ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke="currentColor" strokeWidth="5" /></svg>
                                },
                                {
                                    name: 'Chevrolet',
                                    logo: <svg viewBox="0 0 100 60" className="w-10 h-8"><path d="M5 20h28v20H5zM67 20h28v20H67zM33 30h34" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>
                                },
                                {
                                    name: 'BMW',
                                    logo: <svg viewBox="0 0 100 100" className="w-10 h-10"><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" /><circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M50 22 L50 50 L22 50" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                },
                                {
                                    name: 'Volkswagen',
                                    logo: <svg viewBox="0 0 100 100" className="w-10 h-10"><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" /><text x="50" y="65" textAnchor="middle" fontSize="48" fontWeight="bold" fontFamily="Arial" fill="currentColor">VW</text></svg>
                                },
                                {
                                    name: 'Honda',
                                    logo: <svg viewBox="0 0 100 80" className="w-10 h-8"><text x="50" y="60" textAnchor="middle" fontSize="72" fontWeight="bold" fontFamily="Arial" fill="currentColor">H</text></svg>
                                },
                                {
                                    name: 'Nissan',
                                    logo: <svg viewBox="0 0 120 50" className="w-12 h-8"><ellipse cx="60" cy="25" rx="55" ry="22" fill="none" stroke="currentColor" strokeWidth="4" /><line x1="5" y1="25" x2="115" y2="25" stroke="currentColor" strokeWidth="4" /><text x="60" y="31" textAnchor="middle" fontSize="14" fontWeight="bold" fontFamily="Arial" fill="currentColor">NISSAN</text></svg>
                                },
                                {
                                    name: 'Mercedes-Benz',
                                    logo: <svg viewBox="0 0 100 100" className="w-10 h-10"><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" /><path d="M50 10 L50 50 M50 50 L85 72 M50 50 L15 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
                                },
                                {
                                    name: 'Hyundai',
                                    logo: <svg viewBox="0 0 100 80" className="w-10 h-8"><text x="50" y="58" textAnchor="middle" fontSize="68" fontStyle="italic" fontWeight="bold" fontFamily="Arial" fill="currentColor">H</text></svg>
                                },
                                {
                                    name: 'Audi',
                                    logo: <svg viewBox="0 0 160 60" className="w-14 h-8"><circle cx="20" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="53" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="86" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="119" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
                                },
                                {
                                    name: 'KIA',
                                    logo: <svg viewBox="0 0 100 50" className="w-12 h-8"><text x="50" y="38" textAnchor="middle" fontSize="40" fontWeight="800" fontFamily="Arial" fill="currentColor" letterSpacing="-2">KIA</text></svg>
                                },
                                {
                                    name: 'Ford',
                                    logo: <svg viewBox="0 0 120 60" className="w-12 h-8"><ellipse cx="60" cy="30" rx="55" ry="26" fill="none" stroke="currentColor" strokeWidth="4" /><text x="60" y="38" textAnchor="middle" fontSize="26" fontStyle="italic" fontWeight="bold" fontFamily="Arial" fill="currentColor">Ford</text></svg>
                                },
                                {
                                    name: 'Tesla',
                                    logo: <svg viewBox="0 0 100 100" className="w-10 h-10"><path d="M50 20 L50 90 M20 20 Q50 10 80 20 M20 20 Q35 20 50 40 M80 20 Q65 20 50 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
                                },
                            ].map((brand, i) => (
                                <button key={i} className="flex flex-col items-center gap-2.5 bg-[#EEF4FF] hover:bg-[#deeaff] rounded-xl py-4 px-2 transition-colors group">
                                    <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
                                        {brand.logo}
                                    </div>
                                    <span className="text-[12px] font-semibold text-gray-700 text-center leading-tight">{brand.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* ── Rent by body type ── */}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[1.35rem] font-bold text-gray-900">Rent by body type</h2>
                            <button className="flex items-center gap-1.5 text-gray-600 font-semibold text-[13px] hover:text-gray-900 transition-colors">
                                View all <span className="text-lg leading-none">→</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
                            {[
                                {
                                    name: 'SUV',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="20" width="90" height="22" rx="5" /><path d="M15 20 L25 8 L70 8 L85 20" /><circle cx="22" cy="44" r="8" /><circle cx="75" cy="44" r="8" /><line x1="5" y1="33" x2="95" y2="33" /></svg>
                                },
                                {
                                    name: 'Crossover',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="22" width="90" height="20" rx="4" /><path d="M18 22 L30 10 L72 10 L85 22" /><circle cx="23" cy="44" r="7" /><circle cx="74" cy="44" r="7" /></svg>
                                },
                                {
                                    name: 'Wagon',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="24" width="90" height="18" rx="4" /><path d="M10 24 L15 12 L80 12 L90 24" /><circle cx="22" cy="44" r="7" /><circle cx="75" cy="44" r="7" /></svg>
                                },
                                {
                                    name: 'Family MBP',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="22" width="94" height="20" rx="5" /><path d="M8 22 L12 10 L85 10 L92 22" /><circle cx="20" cy="44" r="7" /><circle cx="78" cy="44" r="7" /><line x1="50" y1="10" x2="50" y2="22" /></svg>
                                },
                                {
                                    name: 'Sport Coupe',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="28" width="90" height="15" rx="4" /><path d="M15 28 Q30 14 55 12 Q75 12 88 28" /><circle cx="22" cy="45" r="7" /><circle cx="75" cy="45" r="7" /></svg>
                                },
                                {
                                    name: 'Compact',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="26" width="84" height="16" rx="4" /><path d="M18 26 L28 14 L68 14 L82 26" /><circle cx="24" cy="44" r="7" /><circle cx="72" cy="44" r="7" /></svg>
                                },
                                {
                                    name: 'Coup',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="27" width="90" height="15" rx="4" /><path d="M12 27 Q28 12 58 11 Q78 11 90 27" /><circle cx="21" cy="44" r="7" /><circle cx="76" cy="44" r="7" /></svg>
                                },
                                {
                                    name: 'BMW',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="26" width="90" height="16" rx="4" /><path d="M15 26 Q28 13 55 11 Q78 11 88 26" /><circle cx="22" cy="44" r="7" /><circle cx="75" cy="44" r="7" /><line x1="55" y1="11" x2="55" y2="26" /></svg>
                                },
                                {
                                    name: 'Sedan',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="26" width="90" height="16" rx="4" /><path d="M15 26 L27 15 L65 15 L85 26" /><circle cx="22" cy="44" r="7" /><circle cx="75" cy="44" r="7" /></svg>
                                },
                                {
                                    name: 'Limousine',
                                    icon: <svg viewBox="0 0 120 55" className="w-20 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="28" width="114" height="15" rx="4" /><path d="M10 28 L20 16 L90 16 L108 28" /><circle cx="20" cy="45" r="7" /><circle cx="55" cy="45" r="7" /><circle cx="98" cy="45" r="7" /></svg>
                                },
                                {
                                    name: 'Convertible',
                                    icon: <svg viewBox="0 0 100 55" className="w-16 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="30" width="90" height="14" rx="4" /><path d="M15 30 Q30 30 42 20 L65 20 L85 30" /><circle cx="22" cy="46" r="6" /><circle cx="75" cy="46" r="6" /></svg>
                                },
                            ].map((type, i) => (
                                <button key={i} className="flex flex-col items-center gap-2.5 bg-[#EEF4FF] hover:bg-[#deeaff] rounded-xl py-4 px-2 transition-colors group">
                                    <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
                                        {type.icon}
                                    </div>
                                    <span className="text-[12px] font-semibold text-gray-700 text-center leading-tight">{type.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ WHY CHOOSE US ══════════════════════════════════════════ */}
                <section className="bg-white py-6 overflow-hidden">
                    <div className="w-full mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-0">

                            {/* Left — Image from user */}
                            <div className="lg:w-[52%] relative flex items-center justify-center">
                                <img
                                    src="/images/why-choose-us.png"
                                    alt="Why Choose Us Car"
                                    className="w-full h-auto max-h-[480px] object-contain object-center"
                                />
                            </div>

                            {/* Right — text content */}
                            <div className="lg:w-[48%] lg:pl-4 lg:pr-12 xl:pr-24 pt-8 lg:pt-0 px-6">
                                {/* Badge */}
                                <div className="inline-block bg-[#EBF3FE] text-[#1877F2] text-[11px] font-bold tracking-wider px-4 py-1.5 rounded mb-5">
                                    WHY CHOOSE US
                                </div>

                                <h2 className="text-[1.7rem] font-bold text-gray-900 leading-snug mb-8">
                                    We offer the best experience with our rental deals
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            ),
                                            title: 'Best price guaranteed',
                                            desc: "Find a lower price? We'll refund you 100% of the difference."
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            ),
                                            title: 'Experience driver',
                                            desc: "Don't have driver? Don't worry, we have many experienced driver for you."
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                                            ),
                                            title: '24 hour car delivery',
                                            desc: 'Book your car anytime and we will deliver it directly to you.'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            ),
                                            title: '24/7 technical support',
                                            desc: 'Have a question? Contact Rentcars support any time when you have problem.'
                                        },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-11 h-11 rounded-xl bg-[#EBF3FE] flex items-center justify-center flex-shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-[15px] mb-1">{item.title}</div>
                                                <div className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ OUR IMPRESSIVE COLLECTION ═════════════════════════════ */}
                <section className="bg-[#E6EEF6] pt-16 pb-24">
                    <div className="max-w-[1220px] mx-auto px-6 lg:px-8">

                        {/* Section Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-[2.2rem] font-bold text-gray-900 mb-4 tracking-tight">Our Impressive Collection of Cars</h2>
                            <p className="text-gray-800 font-semibold text-[13px] max-w-2xl mx-auto leading-relaxed">
                                Ranging from elegant sedans to powerful sports cars, all carefully selected to provide<br className="hidden md:block" /> our customers with the ultimate driving experience.
                            </p>
                        </div>

                        {/* Tabs / Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                            {['Popular Car', 'Luxury Car', 'Vintage Car', 'Family Car', 'Off-Road Car'].map((tab, i) => (
                                <button
                                    key={i}
                                    className={`px-6 py-2.5 rounded-full font-bold text-[13px] transition-colors shadow-sm ${i === 0 ? 'bg-[#151515] text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Grid - 5 columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
                            {collectionCars.map((car, i) => (
                                <CarCard key={i} {...car} />
                            ))}
                        </div>

                        {/* Bottom Button */}
                        <div className="flex justify-center mt-12">
                            <button className="bg-[#1877F2] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-[14px] transition-colors shadow-md flex items-center gap-1.5">
                                See all Cars <span className="text-lg leading-none">→</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ═══ UNLEASH YOUR JOURNEY / ZIG ZAG ════════════════════════ */}
                <section className="bg-white pt-16 pb-12 lg:pt-20 lg:pb-14 relative overflow-hidden">
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">

                        {/* Row 1 */}
                        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-10 lg:mb-14 relative z-10">
                            {/* Left Text */}
                            <div className="lg:w-[45%] relative">
                                <div className="mb-5">
                                    <div className="border-l-[3px] border-[#1877F2] pl-3 mb-2">
                                        <p className="text-gray-500 text-[12px] font-bold">
                                            Experience the Freedom, Embrace the Exceptional
                                        </p>
                                    </div>
                                    <h2 className="text-[#1877F2] font-extrabold text-[2.6rem] leading-[1.1] tracking-tight mb-5">
                                        Unleash your journey:<br />
                                        The Drivewise<br />
                                        Advantage
                                    </h2>
                                </div>
                                <p className="text-gray-900 font-bold text-[13px] leading-relaxed mb-8 pr-4">
                                    Immerse yourself in a world of possibilities with our extensive range of
                                    vehicles. From sleek sedans to rugged SUVs and luxurious
                                    convertibles, we have the perfect wheels to match your style,
                                    preferences, and the demands of your adventure.
                                </p>
                                <button className="bg-[#1877F2] hover:bg-blue-700 text-white px-7 py-3 rounded-md font-bold text-[14px] transition-colors shadow-md">
                                    Explore the posibilites
                                </button>

                                {/* Wavy dotted line SVG */}
                                <svg className="absolute hidden lg:block -bottom-[220px] -left-16 w-[200px] h-[260px] z-[-1]" fill="none" viewBox="0 0 220 280">
                                    <path
                                        d="M 170 5 C 115 12, 50 40, 70 85 C 92 130, 168 132, 145 182 C 122 228, 48 218, 62 256 C 72 276, 115 276, 142 268"
                                        stroke="#9ca3af"
                                        strokeWidth="2.5"
                                        strokeDasharray="6 6"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 132 260 L 142 268 L 134 276"
                                        stroke="#9ca3af"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            {/* Right Image */}
                            <div className="lg:w-[55%]">
                                <img
                                    src="/images/volvo-car.png"
                                    alt="Volvo SUV"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20 relative z-10">
                            {/* Left Image */}
                            <div className="lg:w-[55%]">
                                <img
                                    src="/images/bmw-car.png"
                                    alt="BMW Car"
                                    className="w-full h-auto object-contain"
                                />
                            </div>

                            {/* Right Text */}
                            <div className="lg:w-[45%]">
                                <div className="mb-5">
                                    <div className="border-l-[3px] border-[#1877F2] pl-3 mb-2">
                                        <p className="text-gray-500 text-[12px] font-bold">
                                            Experience the Freedom, Embrace the Exceptional
                                        </p>
                                    </div>
                                    <h2 className="text-[#1877F2] font-extrabold text-[2.6rem] leading-[1.1] tracking-tight mb-5">
                                        Beyond Rentals, Building<br />
                                        Memories
                                    </h2>
                                </div>
                                <p className="text-gray-900 font-bold text-[13px] leading-relaxed mb-8 pr-4">
                                    We are more than just a car rental service. We strive to be your travel
                                    companion, providing recommendations, tips, and local insights to
                                    help you create unforgettable memories. Count on us to make your
                                    journey not only comfortable but also enriching and unforgettable.
                                </p>
                                <button className="bg-[#1877F2] hover:bg-blue-700 text-white px-7 py-3 rounded-md font-bold text-[14px] transition-colors shadow-md">
                                    Book your car today
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ═══ GLOBAL REACH / LOCATIONS ═══════════════════════════════ */}
                <section className="bg-[#E8F1FA] py-14 lg:py-16 overflow-hidden">
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
                            {/* Left Text */}
                            <div className="lg:w-[48%] flex-shrink-0">
                                <p className="text-gray-700 font-bold text-[13px] mb-3">
                                    Experience the Freedom, Embrace the Exceptional
                                </p>
                                <h2 className="text-[#1D63B8] font-black text-[1.75rem] sm:text-[2.05rem] lg:text-[2.2rem] xl:text-[2.45rem] leading-[1.16] tracking-tight mb-5">
                                    <span className="block sm:whitespace-nowrap">Global Reach, Local Presence:</span>
                                    <span className="block sm:whitespace-nowrap">Discover Our 120+ Car Rental</span>
                                    <span className="block sm:whitespace-nowrap">Locations Worldwide</span>
                                </h2>
                                <p className="text-gray-900 font-bold text-[13px] leading-relaxed mb-8 max-w-[460px]">
                                    At Drivewise, we believe in making car rental convenient and accessible wherever your travels take you. With over 120 locations spread across the globe, we are proud to offer our services in some of the most vibrant cities, popular tourist destinations, and major transportation hubs.
                                </p>
                                <button className="bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-[14px] px-8 py-3.5 rounded-lg transition-colors shadow-sm">
                                    Find your nerest location
                                </button>
                            </div>

                            {/* Right Map Image */}
                            <div className="lg:w-[52%] flex justify-end items-center">
                                <img
                                    src="/images/locations-map.png"
                                    alt="Global Car Rental Locations Map"
                                    className="w-full h-auto max-h-[390px] lg:max-h-[440px] object-contain ml-auto lg:translate-x-4 xl:translate-x-8"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ TESTIMONIALS ══════════════════════════════════════════ */}
                <section className="bg-white py-20">
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                        <div className="text-center mb-16">
                            <p className="text-gray-900 font-extrabold text-[12px] uppercase tracking-wider mb-2">
                                TESTIMONIAL
                            </p>
                            <h2 className="text-[2.2rem] lg:text-[2.5rem] font-black text-gray-900 tracking-tight">
                                What Our Happy User Says
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                            {testimonials.map((t, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl p-6 pt-9 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between relative hover:shadow-lg transition-shadow"
                                >
                                    {/* Floating Black Quote Badge */}
                                    <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center absolute -top-5 left-6 shadow-md">
                                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>

                                    {/* Peach Stars */}
                                    <div className="flex gap-1 mb-3 mt-0.5">
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <svg key={s} className="w-4 h-4 text-[#FF7A50] fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Quote text */}
                                    <p className="text-gray-700 font-semibold text-[12.5px] leading-relaxed mb-6">
                                        {t.text}
                                    </p>

                                    {/* Author row */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-9 h-9 rounded-full object-cover border border-gray-200"
                                        />
                                        <div>
                                            <div className="font-bold text-gray-900 text-[12.5px] leading-tight">
                                                {t.name}
                                            </div>
                                            <div className="text-gray-400 text-[11px] leading-tight mt-0.5">
                                                {t.role} <span className="text-gray-400">{t.company}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ DOWNLOAD APP NOW SECTION ══════════════════════════════ */}
                <section className="bg-white pt-6 pb-24">
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                            {/* Left Column */}
                            <div className="lg:w-[52%]">
                                <h2 className="font-black text-gray-900 text-[2rem] lg:text-[2.35rem] tracking-tight mb-4 uppercase">
                                    DOWNLOAD APP NOW
                                </h2>
                                <p className="text-gray-700 font-semibold text-[13px] leading-relaxed mb-8 max-w-[500px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac nunc libero urna, feugiat.
                                </p>

                                {/* Store Buttons */}
                                <div className="flex flex-wrap items-center gap-3 mb-8">
                                    <button className="flex items-center gap-2.5 border border-gray-300 bg-white rounded-full px-5 py-2.5 hover:bg-gray-50 transition shadow-sm">
                                        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.307 10.155c-.035-2.263 1.849-3.376 1.936-3.428-1.048-1.534-2.678-1.745-3.262-1.767-1.391-.14-2.716.82-3.423.82-.705 0-1.792-.801-2.934-.778-1.493.022-2.871.868-3.636 2.203-1.554 2.689-.398 6.666 1.116 8.847.74 1.066 1.621 2.26 2.76 2.217 1.089-.044 1.503-.706 2.822-.706 1.317 0 1.69.706 2.844.685 1.176-.022 1.936-1.09 2.652-2.13 3.655-5.32 1.488-8.204 1.488-8.204-.022-.014-2.316-.9-2.363-3.623zM12.441 4.793c.602-.728 1.008-1.738.898-2.747-1.094.044-2.29.728-2.915 1.457-.552.635-1.042 1.66-.91 2.648 1.206.094 2.324-.627 2.927-1.358z" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-[9px] leading-tight text-gray-500 font-semibold">Download on the</div>
                                            <div className="text-[12px] font-bold leading-tight text-gray-900">App Store</div>
                                        </div>
                                    </button>

                                    <button className="flex items-center gap-2.5 border border-gray-300 bg-white rounded-full px-5 py-2.5 hover:bg-gray-50 transition shadow-sm">
                                        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24">
                                            <path d="M3.609 1.814L13.792 12 3.61 22.186a1.984 1.984 0 01-.61-1.442V3.256c0-.554.218-1.077.609-1.442z" fill="#000000" stroke="#ffffff" strokeWidth="0.75" strokeLinejoin="round" />
                                            <path d="M13.792 12l3.415-3.415L4.542 1.26a1.983 1.983 0 00-1.854-.092L13.792 12z" fill="#000000" stroke="#ffffff" strokeWidth="0.75" strokeLinejoin="round" />
                                            <path d="M17.207 15.415L13.792 12 2.688 23.104a1.982 1.982 0 001.854-.092l12.665-7.597z" fill="#000000" stroke="#ffffff" strokeWidth="0.75" strokeLinejoin="round" />
                                            <path d="M17.207 15.415l4.316-2.589a1.984 1.984 0 000-3.414l-4.316-2.589-3.415 3.415 3.415 3.415z" fill="#000000" stroke="#ffffff" strokeWidth="0.75" strokeLinejoin="round" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-[9px] leading-tight text-gray-500 font-semibold">GET IT ON</div>
                                            <div className="text-[12px] font-bold leading-tight text-gray-900">Google Play</div>
                                        </div>
                                    </button>
                                </div>

                                {/* 3 Solid Blue Metric Cards */}
                                <div className="flex flex-wrap gap-4">
                                    {/* Card 1: Download */}
                                    <div className="bg-[#1877F2] text-white rounded-2xl w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] flex flex-col items-center justify-center p-3 shadow-md hover:bg-blue-600 transition">
                                        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <div className="font-extrabold text-[1.25rem] sm:text-[1.35rem] leading-tight">59865</div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider mt-1">DOWNLOAD</div>
                                    </div>

                                    {/* Card 2: Like */}
                                    <div className="bg-[#1877F2] text-white rounded-2xl w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] flex flex-col items-center justify-center p-3 shadow-md hover:bg-blue-600 transition">
                                        <svg className="w-6 h-6 mb-1 fill-current" viewBox="0 0 24 24">
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                        </svg>
                                        <div className="font-extrabold text-[1.25rem] sm:text-[1.35rem] leading-tight">29852</div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider mt-1">LIKE</div>
                                    </div>

                                    {/* Card 3: 5 Star Rating */}
                                    <div className="bg-[#1877F2] text-white rounded-2xl w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] flex flex-col items-center justify-center p-3 shadow-md hover:bg-blue-600 transition">
                                        <svg className="w-6 h-6 mb-1 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <div className="font-extrabold text-[1.25rem] sm:text-[1.35rem] leading-tight">1500</div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider mt-1 text-center leading-tight">5 STAR RATING</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - 3D Smartphone Mockup */}
                            <div className="lg:w-[48%] flex justify-center items-center">
                                <img
                                    src="/images/app-phone-mockup.png?v=2"
                                    alt="CarBazar App on Smartphone"
                                    className="w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px] h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ FOOTER ════════════════════════════════════════════════ */}
                <footer className="bg-[#051C34] text-slate-300 pt-16 pb-8 border-t border-[#082342] w-full">
                    <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-36">
                        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-10 lg:gap-8 mb-16">
                            {/* Column 1: Brand & Contact Info */}
                            <div className="space-y-6 max-w-xs min-w-[220px]">
                                <div className="flex items-center gap-2.5">
                                    <svg className="w-6 h-6 text-white shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.18 2.57 7.77 6.23 9.26l1.13-2.83C6.94 17.3 5.5 14.86 5.5 12c0-3.59 2.91-6.5 6.5-6.5 2.86 0 5.3 1.56 6.43 3.86l2.83-1.13C19.77 4.57 16.18 2 12 2z" fill="currentColor"/>
                                        <path d="M12 22c5.52 0 10-4.48 10-10 0-1.85-.5-3.58-1.38-5.07l-2.73 1.36c.69 1.14 1.11 2.47 1.11 3.71 0 3.59-2.91 6.5-6.5 6.5-1.24 0-2.57-.42-3.71-1.11l-1.36 2.73C9.42 21.5 11.15 22 12 22z" fill="currentColor"/>
                                        <polygon points="9.5,8 16.5,12 9.5,16" fill="currentColor"/>
                                    </svg>
                                    <span className="text-white font-bold text-[17px] tracking-wider uppercase">CarBazar</span>
                                </div>

                                <div className="space-y-4 text-[13px] text-slate-300/90 font-normal">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span className="leading-snug">
                                            Madurai, Tamilnadu,<br />India, 625009.
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <span>+91 8056619497</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                        <span>hkcars@gmail.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Our Product */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Our Product</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><a href="#" className="hover:text-white transition-colors">Bikes</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Cars</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Packages</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                </ul>
                            </div>

                            {/* Column 3: Resources */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Resources</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Help Centre</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Cruises</a></li>
                                </ul>
                            </div>

                            {/* Column 4: About Rentcars */}
                            <div className="min-w-[130px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">About Rentcars</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><a href="#" className="hover:text-white transition-colors">Why choose us</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Press Center</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
                                </ul>
                            </div>

                            {/* Column 5: Follow Us */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Follow Us</h4>
                                <div className="flex items-center gap-3 text-slate-300">
                                    {/* Facebook */}
                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.7-1.5 1.5-1.5H18V2.3c-.6-.08-1.5-.15-2.6-.15-2.7 0-4.4 1.6-4.4 4.6v2.75H8v4h3V22h3v-8.5z" />
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <circle cx="12" cy="12" r="4" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                                        </svg>
                                    </a>

                                    {/* YouTube */}
                                    <a
                                        href="#"
                                        aria-label="YouTube"
                                        className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <rect x="2" y="4" width="20" height="16" rx="4" ry="4" />
                                            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                                        </svg>
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
