import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import HeroCarFilter from '@/Components/HeroCarFilter';
import { CAR_BRANDS } from '@/data/carBrandsModels';

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
const CarCard = ({ image, mainImage, main_image, name, slug = 'toyota-corolla-cross-hybrid-2021', price, priceLakh, price_lakh, askingPrice, asking_price, dailyPrice, daily_price, rating, reviews, passengers, doors, user_id }) => {
    const cardImg = image || mainImage || main_image || '/images/hero-car.jpg';
    const lakhVal = priceLakh || price_lakh;
    const askVal = askingPrice || asking_price;
    const formattedPrice = askVal || (lakhVal ? `${lakhVal}` : null) || (price ? `৳ ${price}` : '৳ 35,00,000');
    const isNewAd = Boolean(user_id);

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col h-full group relative">
            {isNewAd && (
                <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm tracking-wider">
                    New Ad
                </span>
            )}
            <div className="w-full h-[120px] flex items-center justify-center mb-3 overflow-hidden">
                <img src={cardImg} alt={name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" />
            </div>

            <h3 className="font-bold text-[15px] text-gray-900 mb-1 truncate" title={name}>{name}</h3>

            <div className="flex items-center gap-1 mb-4">
                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                </svg>
                <span className="font-bold text-[11px] text-gray-900">{rating || '4.9'}</span>
                <span className="text-[11px] text-gray-400">({reviews || '2,000'} reviews)</span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-2 mb-4 mt-auto">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {passengers || 5} Passagers
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
                    {doors || 4} Doors
                </div>
            </div>

            <div className="border-t border-gray-100 mb-4"></div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] text-gray-500 font-medium">Selling Price</span>
                <div>
                    <span className="font-bold text-[15px] text-gray-900">{formattedPrice}</span>
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
};

export default function Welcome({ auth, collectionCars: dbCollectionCars, popularBrands: dbPopularBrands }) {
    const carCategories = [
        { label: 'Sedan', icon: <SedanIcon /> },
        { label: 'SUV', icon: <SuvIcon /> },
        { label: 'Sports', icon: <SportsIcon /> },
        { label: 'Coupe', icon: <SedanIcon /> },
        { label: 'Pickup', icon: <SuvIcon /> },
    ];

    const defaultCollectionCars = [
        { image: '/images/corolla-cross-1.jpg', name: 'Toyota Corolla Cross Hybrid', slug: 'toyota-corolla-cross-hybrid-2021', brand: 'Toyota', bodyType: 'SUV', price: '2,500', rating: '4.9', reviews: '2,436', passengers: 5, doors: 4, category: 'popular,family' },
        { image: '/images/hero-car.jpg', name: 'Jaguar XE L P250', slug: 'jaguar-xe-l-p250', brand: 'Jaguar', bodyType: 'Sedan', price: '1,800', rating: '4.8', reviews: '2,436', passengers: 4, doors: 4, category: 'luxury,popular' },
        { image: '/images/audi-car.jpg', name: 'Audi R8 Performance', slug: 'audi-r8', brand: 'Audi', bodyType: 'Sport Coupe', price: '2,100', rating: '4.6', reviews: '1,936', passengers: 2, doors: 2, category: 'luxury' },
        { image: '/images/bmw-car.jpg', name: 'BMW M3 Competition', slug: 'bmw-m3', brand: 'BMW', bodyType: 'Sedan', price: '1,600', rating: '4.5', reviews: '2,036', passengers: 4, doors: 4, category: 'popular,luxury' },
        { image: '/images/lamborghini-car.jpg', name: 'Lamborghini Huracán EVO', slug: 'lamborghini-huracan', brand: 'Lamborghini', bodyType: 'Coup', price: '2,300', rating: '4.3', reviews: '2,236', passengers: 2, doors: 2, category: 'luxury' },
        { image: '/images/volvo-car.jpg', name: 'Volvo XC90 Recharge 7-Seater', slug: 'volvo-xc90-recharge-2023', brand: 'Volvo', bodyType: 'Family MBP', price: '2,200', rating: '4.9', reviews: '1,420', passengers: 7, doors: 4, category: 'family,luxury' },
        { image: '/images/jeep-car.jpg', name: 'Jeep Wrangler Rubicon 4x4', slug: 'jeep-wrangler-rubicon-392-2023', brand: 'Jeep', bodyType: 'SUV', price: '2,400', rating: '4.8', reviews: '1,830', passengers: 5, doors: 4, category: 'off-road,popular' },
        { image: '/images/ferrari-car.jpg', name: '1974 Ferrari Dino 246 GT', slug: 'ferrari-dino-246-gt-classic', brand: 'Ferrari', bodyType: 'Coup', price: '3,500', rating: '5.0', reviews: '980', passengers: 2, doors: 2, category: 'vintage,luxury' },
        { image: '/images/hero-car.jpg', name: 'Chevrolet Corvette Stingray 3LT V8', slug: 'chevrolet-corvette-stingray-2023', brand: 'Chevrolet', bodyType: 'Sport Coupe', price: '2,800', rating: '4.9', reviews: '1,420', passengers: 2, doors: 2, category: 'luxury,popular' },
        { image: '/images/corolla-cross-2.jpg', name: 'Volkswagen Golf GTI Performance Mk8', slug: 'volkswagen-golf-gti-2023', brand: 'Volkswagen', bodyType: 'Compact', price: '1,500', rating: '4.7', reviews: '1,890', passengers: 5, doors: 4, category: 'popular' },
        { image: '/images/bmw-car.jpg', name: 'Honda Civic Type R FL5 Turbo', slug: 'honda-civic-type-r-2023', brand: 'Honda', bodyType: 'Compact', price: '1,900', rating: '4.9', reviews: '2,150', passengers: 4, doors: 4, category: 'popular,luxury' },
        { image: '/images/audi-car.jpg', name: 'Nissan GT-R Nismo Track Edition', slug: 'nissan-gt-r-nismo-2022', brand: 'Nissan', bodyType: 'Sport Coupe', price: '2,700', rating: '4.9', reviews: '1,980', passengers: 4, doors: 2, category: 'luxury,popular' },
        { image: '/images/hero-car.jpg', name: 'Mercedes-Benz S500 4MATIC Limousine', slug: 'mercedes-benz-s500-limousine-2023', brand: 'Mercedes-Benz', bodyType: 'Limousine', price: '3,200', rating: '5.0', reviews: '1,720', passengers: 5, doors: 4, category: 'luxury,popular' },
        { image: '/images/corolla-cross-1.jpg', name: 'Hyundai Tucson Hybrid HTRAC Crossover', slug: 'hyundai-tucson-hybrid-2023', brand: 'Hyundai', bodyType: 'Crossover', price: '1,600', rating: '4.7', reviews: '1,640', passengers: 5, doors: 4, category: 'popular,family' },
        { image: '/images/corolla-cross-3.jpg', name: 'Kia Sportage X-Line AWD Crossover', slug: 'kia-sportage-x-line-2023', brand: 'Kia', bodyType: 'Crossover', price: '1,700', rating: '4.8', reviews: '1,530', passengers: 5, doors: 4, category: 'popular,family' },
        { image: '/images/bmw-car.png', name: 'Ford Mustang GT Premium Convertible', slug: 'ford-mustang-gt-convertible-2023', brand: 'Ford', bodyType: 'Convertible', price: '2,400', rating: '4.8', reviews: '1,890', passengers: 4, doors: 2, category: 'luxury,popular' },
        { image: '/images/hero-car.jpg', name: 'Tesla Model 3 Performance AWD', slug: 'tesla-model-3-performance-2023', brand: 'Tesla', bodyType: 'Sedan', price: '2,100', rating: '4.9', reviews: '2,310', passengers: 5, doors: 4, category: 'popular,luxury' },
        { image: '/images/audi-car.jpg', name: 'Audi RS6 Avant Performance Wagon', slug: 'audi-rs6-avant-performance-2023', brand: 'Audi', bodyType: 'Wagon', price: '2,900', rating: '5.0', reviews: '1,430', passengers: 5, doors: 5, category: 'luxury,family' },
    ];

    const collectionCars = dbCollectionCars && dbCollectionCars.length > 0 ? dbCollectionCars : defaultCollectionCars;

    const [activeCollectionTab, setActiveCollectionTab] = useState('All Cars');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedBodyType, setSelectedBodyType] = useState(null);
    const [brandModalOpen, setBrandModalOpen] = useState(false);
    const [brandModalSearch, setBrandModalSearch] = useState('');

    const collectionTabs = ['All Cars', 'Popular Car', 'Luxury Car', 'Vintage Car', 'Family Car', 'Off-Road Car'];

    const tabKeyMap = {
        'All Cars': 'all',
        'Popular Car': 'popular',
        'Luxury Car': 'luxury',
        'Vintage Car': 'vintage',
        'Family Car': 'family',
        'Off-Road Car': 'off-road',
    };

    const scrollToCollection = () => {
        setTimeout(() => {
            const section = document.getElementById('impressive-collection-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    const handleBrandSelect = (brandName) => {
        if (selectedBrand?.toLowerCase() === brandName.toLowerCase()) {
            setSelectedBrand(null);
        } else {
            setSelectedBrand(brandName);
            setSelectedBodyType(null);
            scrollToCollection();
        }
    };

    const handleBodyTypeSelect = (typeName) => {
        if (selectedBodyType?.toLowerCase() === typeName.toLowerCase()) {
            setSelectedBodyType(null);
        } else {
            setSelectedBodyType(typeName);
            setSelectedBrand(null);
            scrollToCollection();
        }
    };

    const filteredCollectionCars = useMemo(() => {
        let list = collectionCars;

        // 1. If Brand filter active
        if (selectedBrand) {
            const bNorm = selectedBrand.toLowerCase().replace(/[^a-z0-9]/g, '');
            return list.filter(car => {
                const b = (car.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const n = (car.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const s = (car.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                return b.includes(bNorm) || n.includes(bNorm) || s.includes(bNorm);
            });
        }

        // 2. If Body Type filter active
        if (selectedBodyType) {
            const tNorm = selectedBodyType.toLowerCase().trim();
            return list.filter(car => {
                const bType = (car.bodyType || car.body_type || '').toLowerCase();
                const name = (car.name || '').toLowerCase();
                const slug = (car.slug || '').toLowerCase();
                const cat = (car.category || '').toLowerCase();

                let specBody = '';
                const specs = car.keySpecifications || car.key_specifications;
                if (Array.isArray(specs)) {
                    const found = specs.find(s => s.label && s.label.toLowerCase().includes('body'));
                    if (found) specBody = (found.value || '').toLowerCase();
                }

                if (tNorm === 'suv') {
                    return bType.includes('suv') || specBody.includes('suv') || name.includes('suv') || name.includes('cross') || name.includes('wrangler') || name.includes('xc90') || slug.includes('wrangler');
                }
                if (tNorm === 'crossover') {
                    return bType.includes('crossover') || specBody.includes('crossover') || name.includes('crossover') || name.includes('tucson') || name.includes('sportage') || name.includes('cross');
                }
                if (tNorm === 'wagon') {
                    return bType.includes('wagon') || specBody.includes('wagon') || name.includes('wagon') || name.includes('avant') || slug.includes('avant') || name.includes('estate');
                }
                if (tNorm === 'family mbp' || tNorm.includes('family') || tNorm.includes('mbp')) {
                    return cat.includes('family') || bType.includes('family') || specBody.includes('family') || (car.passengers && Number(car.passengers) >= 5) || name.includes('xc90') || name.includes('cross');
                }
                if (tNorm === 'sport coupe') {
                    return bType.includes('sport coupe') || specBody.includes('sport coupe') || bType.includes('coupe') || name.includes('coupe') || slug.includes('r8') || slug.includes('corvette') || slug.includes('gt-r');
                }
                if (tNorm === 'compact') {
                    return bType.includes('compact') || specBody.includes('compact') || name.includes('golf') || name.includes('civic') || slug.includes('golf') || slug.includes('civic');
                }
                if (tNorm === 'coup' || tNorm === 'coupe') {
                    return bType.includes('coup') || specBody.includes('coup') || name.includes('coupe') || slug.includes('dino') || slug.includes('huracan') || slug.includes('r8') || slug.includes('corvette');
                }
                if (tNorm === 'bmw') {
                    return (car.brand || '').toLowerCase().includes('bmw') || name.includes('bmw') || slug.includes('bmw');
                }
                if (tNorm === 'sedan') {
                    return bType.includes('sedan') || specBody.includes('sedan') || name.includes('sedan') || slug.includes('jaguar') || slug.includes('bmw-m3') || slug.includes('s500') || slug.includes('tesla');
                }
                if (tNorm === 'limousine') {
                    return bType.includes('limousine') || specBody.includes('limousine') || name.includes('limousine') || slug.includes('s500') || name.includes('s-class') || name.includes('s500');
                }
                if (tNorm === 'convertible') {
                    return bType.includes('convertible') || specBody.includes('convertible') || name.includes('convertible') || slug.includes('mustang');
                }

                return bType.includes(tNorm) || specBody.includes(tNorm) || name.includes(tNorm);
            });
        }

        // 3. Fallback to activeCollectionTab
        const key = tabKeyMap[activeCollectionTab];
        if (!key || key === 'all') return list;

        return list.filter(car => {
            const cat = (car.category || '').toLowerCase();
            const condition = (car.condition || '').toLowerCase();
            const tag = (car.tag || '').toLowerCase();
            const name = (car.name || '').toLowerCase();
            const brand = (car.brand || '').toLowerCase();
            const slug = (car.slug || '').toLowerCase();

            if (key === 'popular') {
                return cat.includes('popular') || slug.includes('corolla') || slug.includes('bmw') || slug.includes('jaguar') || slug.includes('jeep') || Boolean(car.user_id) || tag.includes('verified');
            }
            if (key === 'luxury') {
                return cat.includes('luxury') || slug.includes('audi') || slug.includes('lamborghini') || slug.includes('bmw') || slug.includes('jaguar') || slug.includes('volvo') || slug.includes('ferrari') || brand === 'lexus' || slug.includes('lexus');
            }
            if (key === 'vintage') {
                return cat.includes('vintage') || condition.includes('vintage') || condition.includes('classic') || tag.includes('vintage') || slug.includes('ferrari') || slug.includes('dino') || name.includes('1974');
            }
            if (key === 'family') {
                return cat.includes('family') || slug.includes('volvo') || slug.includes('corolla') || (car.passengers && Number(car.passengers) >= 5);
            }
            if (key === 'off-road') {
                return cat.includes('off-road') || slug.includes('jeep') || slug.includes('wrangler') || brand === 'jeep' || name.includes('rubicon');
            }
            return true;
        });
    }, [activeCollectionTab, collectionCars, selectedBrand, selectedBodyType]);


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
            <Head title="CarBazar - Buy & Sell Cars Online | Premier Car Marketplace" />

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
                                <a href="#cars-section" className="hover:text-[#1877F2] transition-colors">Buy</a>
                                <a href="#how-it-works-section" className="hover:text-[#1877F2] transition-colors">Sell</a>
                                <a href="#impressive-collection-section" className="hover:text-[#1877F2] transition-colors">Hot Deals</a>
                                <a href="#how-it-works-section" className="hover:text-[#1877F2] transition-colors">How it works</a>
                                <a href="#why-choose-us-section" className="hover:text-[#1877F2] transition-colors">Why choose us</a>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-4 text-[14px] font-semibold">
                                {auth?.user ? (
                                    <div className="flex items-center gap-3">
                                        {auth.user.is_admin && (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="px-3 py-1.5 rounded-lg bg-slate-900 text-blue-400 hover:text-blue-300 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                                Admin Panel
                                            </Link>
                                        )}
                                        <Link href={route('dashboard')} className="text-gray-800 hover:text-[#1877F2] transition-colors">
                                            {auth.user.is_admin ? 'Seller View' : 'Dashboard'}
                                        </Link>
                                    </div>
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
                                <span className="block text-[3.2rem] lg:text-[4.0rem] text-[#1877F2] font-black uppercase">DREAM CAR</span>
                            </h1>
                            <p className="text-gray-900 mt-5 text-[15px] leading-relaxed max-w-[420px] font-medium">
                                Bangladesh's trusted car marketplace to buy and sell verified pre-owned & brand new cars. Genuine inspection, best market valuation, and transparent ownership transfer.
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
                                if (filters?.brand) {
                                    setSelectedBrand(filters.brand);
                                    setSelectedBodyType(null);
                                }
                                scrollToCollection();
                            }}
                        />
                    </div>
                </div>

                {/* ═══ FEATURED CARS FOR SALE ════════════════════════════════ */}
                <section id="cars-section" className="bg-white pt-32 pb-4">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                        {/* Section Header */}
                        <div className="flex flex-col items-center justify-center text-center mb-12">
                            <div className="bg-[#EBF3FE] text-[#1877F2] font-bold text-[11px] px-4 py-2 rounded-md tracking-wide mb-4">
                                FEATURED CARS FOR SALE
                            </div>
                            <h2 className="text-[2rem] font-bold text-gray-900">
                                Most popular verified cars for sale
                            </h2>
                        </div>

                        {/* Cars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {(collectionCars && collectionCars.length > 0 ? collectionCars.slice(0, 5) : [
                                { name: 'Toyota Corolla Cross Hybrid', slug: 'toyota-corolla-cross-hybrid-2021', rating: '4.9', reviews: '2,436', passengers: 5, type: 'Auto', ac: true, doors: 4, price: '38 Lakh Tk', img: '/images/corolla-cross-1.jpg' },
                                { name: 'Jaguar XE L P250', slug: 'jaguar-xe-l-p250', rating: '4.8', reviews: '2,436', passengers: 4, type: 'Auto', ac: true, doors: 4, price: '48 Lakh Tk', img: '/images/hero-car.jpg' },
                                { name: 'Audi R8', slug: 'audi-r8', rating: '4.6', reviews: '1,936', passengers: 2, type: 'Auto', ac: true, doors: 2, price: '1.85 Crore Tk', img: '/images/audi-car.jpg' },
                                { name: 'BMW M3', slug: 'bmw-m3', rating: '4.5', reviews: '2,036', passengers: 4, type: 'Auto', ac: true, doors: 4, price: '1.35 Crore Tk', img: '/images/bmw-car.jpg' },
                                { name: 'Lamborghini Huracán', slug: 'lamborghini-huracan', rating: '4.3', reviews: '2,236', passengers: 2, type: 'Auto', ac: true, doors: 2, price: '2.90 Crore Tk', img: '/images/lamborghini-car.jpg' },
                            ]).map((car, idx) => {
                                const carName = car.name;
                                const carSlug = car.slug || 'toyota-corolla-cross-hybrid-2021';
                                const carRating = car.rating || '4.9';
                                const carReviews = car.reviews || '2,000';
                                const carPassengers = car.passengers || 5;
                                const carType = car.type || car.transmission || 'Auto';
                                const carDoors = car.doors || 4;
                                const carImg = car.img || car.mainImage || car.main_image || car.image || '/images/hero-car.jpg';
                                const carPrice = car.price || car.askingPrice || car.asking_price || (car.priceLakh ? `${car.priceLakh} Tk` : (car.price_lakh ? `${car.price_lakh} Tk` : '৳ 35 Lakh Tk'));
                                const isUserAd = Boolean(car.user_id);

                                return (
                                    <div key={car.id || carSlug || idx} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 p-4 flex flex-col hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow relative group">
                                        {isUserAd && (
                                            <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm tracking-wider">
                                                New Ad
                                            </span>
                                        )}
                                        <div className="h-[100px] mb-3 flex items-center justify-center overflow-hidden">
                                            <img src={carImg} alt={carName} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-[14px] mb-0.5 truncate" title={carName}>{carName}</h3>
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <svg className="w-3.5 h-3.5 text-[#FFC107]" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="font-bold text-gray-900 text-[11px]">{carRating}</span>
                                            <span className="text-gray-400 text-[10px]">({carReviews} reviews)</span>
                                        </div>

                                        {/* Features Grid */}
                                        <div className="grid grid-cols-2 gap-y-1.5 gap-x-1.5 mb-3">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                <span className="text-[10px] font-medium">{carPassengers} Passagers</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                                <span className="text-[10px] font-medium">{carType}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                                <span className="text-[10px] font-medium">Air Conditioning</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                                                <span className="text-[10px] font-medium">{carDoors} Doors</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 my-2.5"></div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-400 text-[11px] font-medium">Selling Price</span>
                                            <div className="font-bold text-[14px] text-gray-900">
                                                {carPrice}
                                            </div>
                                        </div>

                                        <Link
                                            href={`/car/${carSlug}`}
                                            className="w-full py-2.5 rounded-xl border border-[#1877F2] text-[#1877F2] bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-md hover:shadow-blue-500/20 font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all duration-200 group"
                                        >
                                            <span>View Details</span>
                                            <span className="text-base leading-none group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <a href="#impressive-collection-section" className="flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-2.5 text-gray-600 font-semibold text-[13px] hover:bg-gray-50 transition-colors">
                                Browse all cars for sale <span className="text-lg leading-none">→</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ═══ HOW IT WORKS ══════════════════════════════════════════ */}
                <section id="how-it-works-section" className="bg-white pt-4 pb-20 overflow-hidden scroll-mt-10">
                    <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
                        {/* Section Header */}
                        <div className="flex flex-col items-center text-center mb-16">
                            <h2 className="text-[2.2rem] font-bold text-gray-900 mb-4 tracking-tight">How it works</h2>
                            <p className="text-gray-800 font-bold text-[14px] leading-relaxed max-w-2xl">
                                Buying or selling a car has never been easier. Our streamlined marketplace makes it simple<br className="hidden md:block" /> for you to inspect, test-drive, and purchase verified vehicles online
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
                                        title: 'Browse and choose',
                                        desc: 'Explore hundreds of verified cars with authentic physical inspection reports, full specs, and high-resolution photos.'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2 2 4-4" /></svg>
                                        ),
                                        title: 'Inspect & test drive',
                                        desc: 'Schedule a physical inspection or test drive directly at our showroom or with verified sellers at your convenience.'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        ),
                                        title: 'Drive home with pride',
                                        desc: 'Finalize payment securely, complete hassle-free BRTA ownership transfer, and drive home your new dream car.'
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
                {/* ═══ BROWSE BY BRANDS & BODY TYPE ═════════════════════════ */}
                <section className="bg-white py-14">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

                        {/* ── Browse by Brands ── */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <h2 className="text-[1.35rem] font-bold text-gray-900">Browse by Brands</h2>
                                {selectedBrand && (
                                    <span className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 flex items-center gap-1.5">
                                        <span>Active: {selectedBrand}</span>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedBrand(null)}
                                            className="hover:text-red-500 transition-colors"
                                            title="Clear brand"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setBrandModalOpen(true)}
                                className="flex items-center gap-1.5 text-gray-600 font-semibold text-[13px] hover:text-[#1877F2] transition-colors cursor-pointer group"
                            >
                                <span>View all</span>
                                <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 mb-12">
                            {[
                                {
                                    name: 'Toyota',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M12 3.848C5.223 3.848 0 7.298 0 12c0 4.702 5.224 8.152 12 8.152S24 16.702 24 12c0-4.702-5.223-8.152-12-8.152zm7.334 3.839c0 1.08-1.725 1.913-4.488 2.246-.26-2.58-1.005-4.279-1.963-4.913 2.948.184 6.45 1.227 6.45 2.667zM12 16.401c-.96 0-1.746-1.5-1.808-4.389.577.047 1.18.072 1.808.072.628 0 1.23-.025 1.807-.072-.061 2.89-.847 4.389-1.807 4.389zm0-6.308c-.59 0-1.155-.019-1.69-.054.261-1.728.92-3.15 1.69-3.15.77 0 1.428 1.422 1.689 3.15-.535.034-1.099.054-1.689.054zm-.882-5.075c-.956.633-1.706 2.333-1.964 4.915C6.391 9.6 4.665 8.767 4.665 7.687c0-1.44 3.504-2.49 6.453-2.669zM2.037 11.68a5.265 5.265 0 011.048-3.164c.27 1.547 2.522 2.881 5.972 3.37V12c0 3.772.879 6.203 2.087 6.97-5.107-.321-9.107-3.48-9.107-7.29zm10.823 7.29c1.207-.767 2.087-3.198 2.087-6.97v-.115c3.447-.488 5.704-1.826 5.972-3.37a5.26 5.26 0 011.049 3.165c-.004 3.81-4.008 6.969-9.109 7.29z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Chevrolet',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-9 h-7" fill="currentColor">
                                            <path d="M23.905 9.784H15.92V8.246a.157.157 0 00-.157-.158H8.238a.157.157 0 00-.157.158v1.538H2.358c-.087 0-.193.07-.237.158L.02 14.058c-.045.088-.011.157.077.157H8.08v1.54c0 .086.07.157.157.157h7.525c.087 0 .157-.07.157-.157v-1.54h5.723c.087 0 .193-.07.238-.157l2.1-4.116c.045-.087.011-.158-.076-.158m-2.494.996l-1.244 2.437h-5.232v1.708H9.07v-1.708H2.595L3.84 10.78h5.232V9.073h5.864v1.707z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'BMW',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 .78C18.196.78 23.219 5.803 23.219 12c0 6.196-5.022 11.219-11.219 11.219C5.803 23.219.781 18.196.781 12S5.804.78 12 .78zm-.678.63c-.33.014-.66.042-.992.078l-.107 2.944a9.95 9.95 0 0 1 .71-.094l.07-1.988-.013-.137.043.13.664 1.489h.606l.664-1.488.04-.131-.01.137.07 1.988c.232.022.473.054.71.094l-.109-2.944a14.746 14.746 0 0 0-.992-.078l-.653 1.625-.023.12-.023-.12-.655-1.625zm6.696 1.824l-1.543 2.428c.195.15.452.371.617.522l1.453-.754.092-.069-.069.094-.752 1.453c.163.175.398.458.53.63l2.43-1.544a16.135 16.135 0 0 0-.46-.568L18.777 6.44l-.105.092.078-.115.68-1.356-.48-.48-1.356.68-.115.078.091-.106 1.018-1.539c-.18-.152-.351-.291-.57-.46zM5.5 3.785c-.36.037-.638.283-1.393 1.125a18.97 18.97 0 0 0-.757.914l2.074 1.967c.687-.76.966-1.042 1.508-1.613.383-.405.6-.87.216-1.317-.208-.242-.558-.295-.85-.175l-.028.01.01-.026a.7.7 0 0 0-.243-.734.724.724 0 0 0-.537-.15zm.006.615c.136-.037.277.06.308.2.032.14-.056.272-.154.382-.22.25-1.031 1.098-1.031 1.098l-.402-.383c.417-.51.861-.974 1.062-1.158a.55.55 0 0 1 .217-.139zM12 4.883a7.114 7.114 0 0 0-7.08 6.388v.002a7.122 7.122 0 0 0 8.516 7.697 7.112 7.112 0 0 0 5.68-6.97A7.122 7.122 0 0 0 12 4.885v-.002zm-5.537.242c.047 0 .096.013.14.043.088.059.128.16.106.26-.026.119-.125.231-.205.318l-1.045 1.12-.42-.4s.787-.832 1.045-1.099c.102-.106.168-.17.238-.205a.331.331 0 0 1 .14-.037zM12 5.818A6.175 6.175 0 0 1 18.182 12H12v6.182A6.175 6.175 0 0 1 5.818 12H12V5.818Z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Volkswagen',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M12 0C5.36 0 0 5.36 0 12S5.36 24 12 24 24 18.64 24 12 18.64 0 12 0M12 1.41C13.2 1.41 14.36 1.63 15.43 2L12.13 9.13C12.09 9.17 12.09 9.26 12 9.26S11.91 9.17 11.87 9.13L8.57 2C9.64 1.63 10.8 1.42 12 1.42M6.9 2.74L10.72 10.97C10.8 11.14 10.89 11.19 11 11.19H13C13.12 11.19 13.2 11.14 13.29 10.97L17.06 2.74C18.64 3.64 20 4.93 20.96 6.47L15.6 16.84C15.56 16.93 15.5 16.97 15.47 16.97C15.39 16.97 15.39 16.89 15.34 16.84L13.29 12.3C13.2 12.13 13.12 12.09 13 12.09H11C10.89 12.09 10.8 12.13 10.71 12.3L8.66 16.84C8.61 16.89 8.62 16.97 8.53 16.97C8.44 16.97 8.44 16.89 8.4 16.84L3 6.47C3.94 4.93 5.32 3.64 6.9 2.74M2.06 8.53L8.23 20.53C8.31 20.7 8.4 20.83 8.62 20.83C8.83 20.83 8.91 20.7 9 20.53L11.87 14.14C11.91 14.06 11.96 14 12 14C12.09 14 12.09 14.1 12.13 14.14L15.04 20.53C15.13 20.7 15.21 20.83 15.43 20.83C15.64 20.83 15.73 20.7 15.81 20.53L22 8.53C22.37 9.6 22.59 10.76 22.59 12C22.54 17.79 17.79 22.59 12 22.59C6.21 22.59 1.46 17.79 1.46 12C1.46 10.8 1.67 9.65 2.06 8.53Z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Honda',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M23.902 6.87c-.33-3.218-2.47-3.895-4.354-4.204-.946-.16-2.63-.3-3.716-.34-.946-.06-3.168-.09-3.835-.09-.657 0-2.89.03-3.835.09-1.076.04-2.77.18-3.716.34C2.563 2.985.42 3.66.092 6.87c-.08.877-.1 2.023-.09 3.248.03 2.031.2 3.406.3 4.363.07.657.338 2.62.687 3.636.478 1.395.916 1.803 1.424 2.222.937.757 2.471.996 2.79 1.056 1.733.31 5.24.368 6.784.368 1.544 0 5.05-.05 6.784-.368.329-.06 1.863-.29 2.79-1.056.508-.419.946-.827 1.424-2.222.35-1.016.628-2.979.698-3.636.1-.957.279-2.332.299-4.363.04-1.225.01-2.371-.08-3.248m-1.176 5.4c-.19 2.57-.418 4.104-.747 5.22-.29.976-.637 1.623-1.165 2.092-.867.787-2.063.956-2.76 1.056-1.514.23-4.055.3-6.057.3-2.002 0-4.543-.08-6.057-.3-.697-.1-1.893-.269-2.76-1.056-.518-.469-.876-1.126-1.155-2.093-.329-1.105-.558-2.65-.747-5.22-.11-1.543-.09-4.054.08-5.4.258-2.011 1.255-3.018 3.387-3.396.996-.18 2.34-.31 3.606-.37 1.016-.07 2.7-.1 3.636-.09.936-.01 2.62.03 3.636.09 1.275.06 2.61.19 3.606.37 2.142.378 3.139 1.395 3.388 3.397.199 1.345.229 3.856.11 5.4m-5.202-8.39c-.548 2.462-.767 3.588-1.216 5.37-.428 1.715-.767 3.298-1.335 4.065-.587.777-1.365.947-1.893 1.006-.279.03-.478.04-1.066.05-.596 0-.796-.02-1.075-.05-.528-.06-1.315-.229-1.892-1.006-.578-.767-.907-2.35-1.335-4.064-.47-1.773-.678-2.91-1.236-5.37 0 0-.548.02-.797.04-.329.02-.588.05-.867.09.343 5.372.692 11.079 1.126 16.13a21.983 21.983 0 002.39.169c.33-1.266.748-3.02 1.207-3.767.378-.608.966-.677 1.295-.717.518-.07.956-.08 1.165-.08.2-.01.637 0 1.165.08.33.05.917.11 1.295.717.47.747.877 2.5 1.206 3.766 0 0 .358-.01 1.165-.05.41-.018.82-.058 1.226-.12.458-5.39.785-10.728 1.126-16.128-.28-.04-.538-.07-.867-.09-.23-.02-.787-.04-.787-.04z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Nissan',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M20.576 14.955l-.01.028c-1.247 3.643-4.685 6.086-8.561 6.086-3.876 0-7.32-2.448-8.562-6.09l-.01-.029H.71v.329l1.133.133c.7.08.847.39 1.038.78l.048.096c1.638 3.495 5.204 5.752 9.08 5.752 3.877 0 7.443-2.257 9.081-5.747l.048-.095c.19-.39.338-.7 1.038-.781l1.134-.134v-.328zM3.443 9.012c1.247-3.643 4.686-6.09 8.562-6.09 3.876 0 7.319 2.447 8.562 6.09l.01.028h2.728v-.328l-1.134-.133c-.7-.081-.847-.39-1.038-.781l-.047-.096C19.448 4.217 15.88 1.96 12.005 1.96c-3.881 0-7.443 2.257-9.081 5.752l-.048.095c-.19.39-.338.7-1.038.781l-1.133.133v.329h2.724zm13.862 1.586l-1.743 2.795h.752l.31-.5h2.033l.31.5h.747l-1.743-2.795zm1.033 1.766h-1.395l.7-1.124zm2.81-1.066l2.071 2.095H24v-2.795h-.614v2.085l-2.062-2.085h-.795v2.795h.619zM0 13.393h.619v-2.095l2.076 2.095h.781v-2.795h-.619v2.085L.795 10.598H0zm4.843-2.795h.619v2.795h-.62zm4.486 2.204c-.02.005-.096.005-.124.005H6.743v.572h2.5c.019 0 .167 0 .195-.005.51-.048.743-.472.743-.843 0-.381-.243-.79-.705-.833-.09-.01-.166-.01-.2-.01H7.643a.83.83 0 0 1-.181-.014c-.129-.034-.176-.148-.176-.243 0-.086.047-.2.18-.238a.68.68 0 0 1 .172-.014h2.357v-.562H7.6c-.1 0-.176.004-.238.014a.792.792 0 0 0-.695.805c0 .343.214.743.685.81.086.009.205.009.258.009H9.2c.029 0 .1 0 .114.005.181.023.243.157.243.276a.262.262 0 0 1-.228.266zm4.657 0c-.02.005-.096.005-.129.005H11.4v.572h2.5c.019 0 .167 0 .195-.005.51-.048.743-.472.743-.843 0-.381-.243-.79-.705-.833-.09-.01-.166-.01-.2-.01H12.3a.83.83 0 0 1-.181-.014c-.129-.034-.176-.148-.176-.243 0-.086.047-.2.18-.238a.68.68 0 0 1 .172-.014h2.357v-.562h-2.395c-.1 0-.176.004-.238.014a.792.792 0 0 0-.695.805c0 .343.214.743.686.81.085.009.204.009.257.009h1.59c.029 0 .1 0 .114.005.181.023.243.157.243.276a.267.267 0 0 1-.228.266Z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Mercedes-Benz',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zM3.245 17.539A10.357 10.357 0 0012 22.36c3.681 0 6.917-1.924 8.755-4.821L12 14.203zm10.663-6.641l7.267 5.915A10.306 10.306 0 0022.36 12c0-5.577-4.417-10.131-9.94-10.352zm-2.328-9.25C6.057 1.869 1.64 6.423 1.64 12c0 1.737.428 3.374 1.185 4.813l7.267-5.915z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Hyundai',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-9 h-7" fill="currentColor">
                                            <path d="M12 18.1622c-6.6275 0-12-2.7586-12-6.163 0-3.4028 5.3725-6.1614 12-6.1614 6.6278 0 12 2.7586 12 6.1614 0 3.4044-5.3722 6.163-12 6.163zM7.6023 7.17C3.701 7.9784.973 9.8302.973 11.9844c0 1.1929.8382 2.2932 2.248 3.1757.1174.0724.1941.0862.251.0826.1019-.006.1593-.0698.201-.146.028-.0485.0631-.1225.0972-.1968.4601-1.0834 2.0776-4.8333 4.2023-7.3758a1.1775 1.1775 0 0 0 .1048-.1461c.046-.084.0356-.1513.0006-.192-.0593-.0647-.2247-.065-.4756-.016zM9.742 8.8995c-1.1728 2.8492 1.0473 2.4961 1.6478 2.3637 1.0203-.2258 1.9944-.6128 2.7746-.925 2.2216-.8887 3.4012-1.7804 3.7925-2.123a1.9839 1.9839 0 0 0 .1076-.0988c.0557-.058.0976-.1192.0976-.2002 0-.0936-.081-.1687-.2374-.2231-.012-.0049-.0517-.021-.0641-.025-1.698-.5415-3.724-.8563-5.9016-.8563-.0168 0-.0586-.0022-.1169 0-.2608.0078-.5509.0664-.787.1888-.7777.4049-1.1163 1.4235-1.313 1.899zm10.5851.0037c-.0268.0487-.0612.1224-.0962.1974-.4599 1.0826-2.0774 4.831-4.2018 7.3733-.0515.063-.0796.1031-.1042.1467-.0492.0846-.0388.1535 0 .1935.0572.0641.2235.0654.474.0157 3.8998-.81 6.628-2.6606 6.628-4.8149 0-1.1925-.836-2.2928-2.2472-3.1745-.1161-.073-.1934-.0871-.25-.083-.1028.0067-.16.0699-.2026.1458zM14.258 15.099c1.173-2.849-1.0483-2.494-1.6467-2.3622-1.0218.225-1.996.613-2.7757.924-2.2226.8883-3.4017 1.782-3.7944 2.1234-.0468.0428-.0833.0742-.1066.0995-.0564.0573-.0967.1178-.0967.2007 0 .0923.08.1688.2362.2229.012.0048.0511.0213.0657.0255 1.696.54 3.722.8557 5.9.8557.0177 0 .0592.0016.1178 0 .2609-.0081.5522-.0677.7871-.1888.7781-.4052 1.1169-1.4234 1.3133-1.9007z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Audi',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-10 h-6" fill="currentColor">
                                            <path d="M19.848,7.848c-0.992,0-1.902,0.348-2.616,0.928c-0.714-0.58-1.624-0.928-2.616-0.928 c-0.992,0-1.902,0.348-2.616,0.928c-0.714-0.58-1.624-0.928-2.616-0.928c-0.992,0-1.902,0.348-2.616,0.928 c-0.714-0.58-1.624-0.928-2.616-0.928C1.859,7.848,0,9.707,0,12s1.859,4.152,4.152,4.152c0.992,0,1.902-0.348,2.616-0.928 c0.714,0.58,1.624,0.928,2.616,0.928c0.992,0,1.902-0.348,2.616-0.928c0.714,0.58,1.624,0.928,2.616,0.928 c0.992,0,1.902-0.348,2.616-0.928c0.714,0.58,1.624,0.928,2.616,0.928C22.141,16.152,24,14.293,24,12S22.141,7.848,19.848,7.848z M17.232,13.866c-0.376-0.526-0.598-1.17-0.598-1.866c0-0.696,0.222-1.34,0.598-1.866c0.376,0.526,0.598,1.17,0.598,1.866 C17.83,12.696,17.608,13.34,17.232,13.866z M12,13.866c-0.376-0.526-0.598-1.17-0.598-1.866c0-0.696,0.222-1.34,0.598-1.866 c0.376,0.526,0.598,1.17,0.598,1.866C12.598,12.696,12.376,13.34,12,13.866z M6.768,13.866C6.392,13.34,6.17,12.696,6.17,12 c0-0.696,0.222-1.34,0.598-1.866C7.144,10.66,7.366,11.304,7.366,12C7.366,12.696,7.144,13.34,6.768,13.866z M0.938,12 c0-1.775,1.439-3.214,3.214-3.214c0.736,0,1.414,0.248,1.956,0.665C5.56,10.154,5.232,11.039,5.232,12 c0,0.961,0.328,1.846,0.876,2.549c-0.542,0.416-1.22,0.665-1.956,0.665C2.377,15.214,0.938,13.775,0.938,12z M7.428,14.549 C7.976,13.846,8.304,12.961,8.304,12c0-0.961-0.328-1.846-0.876-2.549c0.542-0.416,1.22-0.665,1.956-0.665 c0.736,0,1.414,0.248,1.956,0.665c-0.549,0.704-0.876,1.588-0.876,2.549c0,0.961,0.328,1.846,0.876,2.549 c-0.542,0.416-1.22,0.665-1.956,0.665C8.648,15.214,7.97,14.966,7.428,14.549z M12.66,14.549c0.549-0.704,0.876-1.588,0.876-2.549 c0-0.961-0.328-1.846-0.876-2.55c0.542-0.416,1.22-0.665,1.956-0.665s1.414,0.248,1.956,0.665 c-0.549,0.704-0.876,1.588-0.876,2.549c0,0.961,0.328,1.846,0.876,2.549c-0.542,0.416-1.22,0.665-1.956,0.665 C13.88,15.214,13.202,14.966,12.66,14.549z M19.848,15.214c-0.736,0-1.414-0.248-1.956-0.665c0.548-0.704,0.876-1.588,0.876-2.549 c0-0.961-0.328-1.846-0.876-2.549c0.542-0.416,1.22-0.665,1.956-0.665c1.775,0,3.214,1.439,3.214,3.214 S21.623,15.214,19.848,15.214z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'KIA',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-9 h-7" fill="currentColor">
                                            <path d="M13.923 14.175c0 .046.015.072.041.072a.123.123 0 0 0 .058-.024l7.48-4.854a.72.72 0 0 1 .432-.13h1.644c.252 0 .422.168.422.42v3.139c0 .38-.084.6-.42.801l-1.994 1.2a.137.137 0 0 1-.067.024c-.024 0-.048-.019-.048-.088v-3.663c0-.043-.012-.071-.041-.071a.113.113 0 0 0-.058.024l-5.466 3.551a.733.733 0 0 1-.42.127h-3.624c-.254 0-.422-.168-.422-.422V9.757c0-.033-.015-.064-.044-.064a.118.118 0 0 0-.057.024L7.732 11.88c-.036.024-.046.041-.046.058 0 .014.008.029.032.055l2.577 2.575c.034.034.058.06.058.089 0 .024-.039.043-.084.043H7.94c-.183 0-.324-.026-.423-.125l-1.562-1.56a.067.067 0 0 0-.048-.024.103.103 0 0 0-.048.015l-2.61 1.57a.72.72 0 0 1-.423.122H.425C.168 14.7 0 14.53 0 14.279v-3.08c0-.38.084-.6.422-.8L2.43 9.192a.103.103 0 0 1 .052-.016c.032 0 .048.03.048.1V13.4c0 .043.01.063.041.063a.144.144 0 0 0 .06-.024L9.407 9.36a.733.733 0 0 1 .446-.124h3.648c.252 0 .422.168.422.42l-.002 4.518z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Ford',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-10 h-7" fill="currentColor">
                                            <path d="M12 8.236C5.872 8.236.905 9.93.905 12.002S5.872 15.767 12 15.767c6.127 0 11.094-1.693 11.094-3.765 0-2.073-4.967-3.766-11.094-3.766zm-5.698 6.24c-.656.005-1.233-.4-1.3-1.101a1.415 1.415 0 0 1 .294-1.02c.195-.254.525-.465.804-.517.09-.017.213-.006.264.054.079.093.056.194-.023.234-.213.109-.47.295-.597.55a.675.675 0 0 0 .034.696c.263.397.997.408 1.679-.225.169-.156.32-.304.473-.48.3-.344.4-.47.8-1.024.005-.006.006-.014.004-.018-.003-.007-.009-.01-.02-.01-.267.007-.5.087-.725.255-.065.048-.159.041-.2-.021-.046-.07-.013-.163.062-.215.363-.253.76-.298 1.166-.367 0 0 .028.002.051-.03.167-.213.292-.405.47-.621.178-.22.41-.42.586-.572.246-.212.404-.283.564-.37.043-.022-.005-.049-.018-.049-.896-.168-1.827-.386-2.717-.056-.616.23-.887.718-.757 1.045.093.231.397.27.683.13a1.55 1.55 0 0 0 .611-.544c.087-.134.27-.038.171.195-.26.611-.757 1.097-1.363 1.118-.516.016-.849-.363-.848-.831.002-.924 1.03-1.532 2.11-1.622 1.301-.108 2.533.239 3.825.395.989.12 1.938.123 2.932-.106.118-.025.2.05.193.168-.01.172-.143.337-.47.516-.373.204-.763.266-1.17.27-.984.008-1.901-.376-2.85-.582.002.041.012.091-.023.117-.525.388-1 .782-1.318 1.334-.011.013-.005.025.013.024.277-.015.525-.022.783-.042.045-.004.047-.015.043-.048a.64.64 0 0 1 .2-.558c.172-.153.387-.17.53-.06.16.126.147.353.058.523a.63.63 0 0 1-.382.31s-.03.006-.026.034c.006.043.2.151.217.18.017.027.008.07-.021.102a.123.123 0 0 1-.095.045c-.033 0-.053-.012-.096-.035a.92.92 0 0 1-.27-.217c-.024-.031-.037-.032-.099-.029-.279.017-.714.059-1.009.096-.071.008-.082.022-.096.047-.47.775-.972 1.61-1.523 2.17-.592.6-1.083.758-1.604.762zM19.05 10.71c-.091.158-1.849 2.834-1.96 3.11-.035.088-.04.155-.004.204.092.124.297.051.425-.038.381-.262.645-.58.937-.858.017-.013.046-.018.065 0 .043.04.106.091.15.137a.04.04 0 0 1 .002.057 5.873 5.873 0 0 1-.904.911c-.47.364-.939.457-1.172.224a.508.508 0 0 1-.14-.316c-.002-.057-.031-.06-.058-.034-.278.275-.76.579-1.198.362-.366-.18-.451-.618-.383-.986.001-.008-.006-.06-.051-.03a1.28 1.28 0 0 1-.3.162.853.853 0 0 1-.366.077.518.518 0 0 1-.451-.253.759.759 0 0 1-.095-.347c-.001-.011-.017-.032-.033-.005-.3.457-.579.899-.875 1.363-.016.022-.03.036-.06.037l-.587.001c-.036 0-.053-.028-.034-.063.104-.2.674-1.03 1.06-1.736.107-.194.085-.294.019-.337-.083-.054-.248.027-.387.133-.379.287-.697.735-.859.935-.095.117-.185.291-.433.56-.391.425-.91.669-1.408.5a.848.848 0 0 1-.546-.58c-.015-.052-.044-.066-.073-.032-.08.1-.245.249-.383.342-.015.011-.052.033-.084.017a.851.851 0 0 1-.152-.199.07.07 0 0 1 .016-.08c.197-.173.305-.271.391-.38.064-.08.113-.17.17-.315.12-.302.393-.866.938-1.158a1.81 1.81 0 0 1 .652-.219c.1-.01.183.002.213.08.011.033.039.105.056.158.011.032.003.057-.035.071-.32.122-.643.311-.865.61-.253.338-.321.746-.152.98.123.17.322.2.514.139.29-.092.538-.363.666-.663.138-.329.16-.717.058-1.059-.016-.059-.001-.104.037-.136.077-.063.184-.112.215-.128a.14.14 0 0 1 .182.045c.106.157.163.378.17.607.006.049.026.05.05.025.19-.202.366-.418.568-.58.185-.147.422-.267.643-.262.286.006.428.2.419.546-.001.044.03.04.051.011a1.19 1.19 0 0 1 .24-.264c.198-.163.4-.236.611-.222.26.02.468.257.425.527a.53.53 0 0 1-.281.406.362.362 0 0 1-.405-.044.336.336 0 0 1-.096-.322c.005-.025-.027-.048-.054-.02-.254.264-.273.606-.107.76.183.17.458.056.658-.075.366-.239.65-.563.979-.813.218-.166.467-.314.746-.351a.87.87 0 0 1 .454.052c.2.081.326.25.342.396.004.043.036.048.063.01.158-.246 1.005-1.517 1.075-1.65.02-.041.044-.047.089-.047h.606c.035 0 .051.02.036.047zm-2.32 2.204a.053.053 0 0 0-.003.04c.003.02.03.04.056.05.01.003.015.01.004.032-.075.16-.143.252-.237.391a1.472 1.472 0 0 1-.3.325c-.178.147-.424.307-.628.2-.09-.047-.13-.174-.127-.276.004-.288.132-.584.369-.875.288-.355.607-.539.816-.438.216.103.148.354.05.55zm-5.949-1.881a.398.398 0 0 1 .132-.345c.057-.05.133-.062.18-.022.052.045.027.157-.026.234a.43.43 0 0 1-.245.177c-.018.004-.034-.004-.041-.044zM12 7.5C5.34 7.5 0 9.497 0 12c0 2.488 5.383 4.5 12 4.5s12-2.02 12-4.5-5.383-4.5-12-4.5zm0 8.608C5.649 16.108.5 14.27.5 12.002.5 9.733 5.65 7.895 12 7.895s11.498 1.838 11.498 4.107c0 2.268-5.148 4.106-11.498 4.106z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Tesla',
                                    logo: (
                                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                            <path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z" />
                                        </svg>
                                    ),
                                },
                            ].map((brand, i) => {
                                const isSelected = selectedBrand?.toLowerCase() === brand.name.toLowerCase();
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleBrandSelect(brand.name)}
                                        className={`flex flex-col items-center gap-2.5 rounded-xl py-4 px-2 transition-all duration-200 cursor-pointer group relative ${isSelected
                                                ? 'bg-[#1877F2] text-white shadow-lg shadow-blue-500/25 ring-2 ring-[#1877F2] ring-offset-2 scale-105'
                                                : 'bg-[#EEF4FF] hover:bg-[#deeaff] text-gray-700 hover:scale-[1.03]'
                                            }`}
                                    >
                                        <div className={`transition-colors ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                            {brand.logo}
                                        </div>
                                        <span className={`text-[12px] text-center leading-tight transition-colors ${isSelected ? 'text-white font-bold' : 'text-gray-700 font-semibold'}`}>
                                            {brand.name}
                                        </span>
                                        {isSelected && (
                                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white shadow animate-ping"></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Browse by body type ── */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <h2 className="text-[1.35rem] font-bold text-gray-900">Browse by body type</h2>
                                {selectedBodyType && (
                                    <span className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 flex items-center gap-1.5">
                                        <span>Active: {selectedBodyType}</span>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedBodyType(null)}
                                            className="hover:text-red-500 transition-colors"
                                            title="Clear body type"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedBodyType(null);
                                    setSelectedBrand(null);
                                    scrollToCollection();
                                }}
                                className="flex items-center gap-1.5 text-gray-600 font-semibold text-[13px] hover:text-[#1877F2] transition-colors cursor-pointer group"
                            >
                                <span>View all</span>
                                <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
                            {[
                                {
                                    name: 'SUV',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="38" y1="9" x2="68" y2="9" strokeWidth="2" />
                                            <line x1="42" y1="9" x2="42" y2="12" strokeWidth="1.5" />
                                            <line x1="64" y1="9" x2="64" y2="12" strokeWidth="1.5" />
                                            <path d="M 6 34 L 6 28 L 9 24 L 27 23 L 37 12 L 72 12 L 78 19 L 91 24 L 92 34 L 88 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 31 22 L 39 15 L 53 15 L 53 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 56 15 L 68 15 L 74 22 L 56 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Crossover',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="42" y1="11" x2="66" y2="11" strokeWidth="1.5" />
                                            <path d="M 6 34 L 7 28 L 11 24 L 27 23 L 38 13 Q 54 12 69 14 L 74 15 L 81 23 L 91 26 L 92 34 L 88 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 31 22 L 39 15 L 52 15 L 52 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 55 15 L 66 15 L 75 22 L 55 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Wagon',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="44" y1="12" x2="74" y2="12" strokeWidth="1.5" />
                                            <path d="M 6 34 L 7 29 L 12 25 L 28 24 L 40 14 L 78 14 L 82 16 L 84 24 L 92 27 L 93 34 L 89 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 32 23 L 41 16 L 52 16 L 52 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 55 16 L 67 16 L 67 23 L 55 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 70 16 L 76 16 L 80 23 L 70 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Family MBP',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 6 34 L 7 29 L 14 25 L 32 12 L 75 12 L 79 15 L 81 23 L 91 26 L 92 34 L 88 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 21 24 L 31 15 L 31 24 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 34 14 L 50 14 L 50 23 L 34 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 53 14 L 72 14 L 77 23 L 53 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <line x1="56" y1="27" x2="79" y2="27" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Sport Coupe',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 5 35 L 6 31 L 11 28 L 26 25 L 36 24 L 48 15 Q 62 15 75 21 Q 85 25 91 25 L 93 23 L 94 25 L 94 33 L 89 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 7 36 L 5 35 Z" />
                                            <path d="M 40 23 L 48 17 Q 60 17 70 20 L 74 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Compact',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 7 34 L 8 28 L 13 25 L 25 23 L 36 14 L 66 14 L 71 15 L 74 21 L 84 25 L 85 34 L 81 36 L 78 36 A 8 8 0 0 0 62 36 L 29.5 36 A 8 8 0 0 0 13.5 36 L 9 36 L 7 34 Z" />
                                            <path d="M 28 22 L 37 16 L 47 16 L 47 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 50 16 L 64 16 L 69 22 L 50 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="21.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="21.5" cy="36" r="2" fill="currentColor" />
                                            <circle cx="70" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="70" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Coup',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 6 34 L 7 29 L 11 25 L 32 23 L 44 14 Q 56 13 67 15 Q 77 19 83 24 L 90 24 L 92 32 L 89 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 35 22 L 45 16 Q 57 15 65 16 L 74 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'BMW',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 63 14 L 66 11 L 67 14" strokeWidth="1.5" fill="currentColor" />
                                            <path d="M 6 34 L 6 29 L 11 25 L 30 24 L 42 14 L 67 14 Q 75 20 78 23 L 89 23 L 92 31 L 89 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 33 22 L 43 16 L 54 16 L 54 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 57 16 L 66 16 L 72 22 L 57 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Sedan',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 6 34 L 7 29 L 11 25 L 28 24 L 40 14 L 65 14 L 76 23 L 89 23 L 92 31 L 89 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 31 22 L 41 16 L 52 16 L 52 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 55 16 L 64 16 L 73 22 L 55 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Limousine',
                                    icon: (
                                        <svg viewBox="0 0 108 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="8" y1="24" x2="8" y2="21" strokeWidth="1.5" />
                                            <path d="M 4 34 L 5 28 L 9 24 L 25 23 L 36 14 L 78 14 L 86 23 L 98 23 L 100 31 L 97 36 L 91.5 36 A 8.5 8.5 0 0 0 74.5 36 L 27.5 36 A 8.5 8.5 0 0 0 10.5 36 L 6 36 L 4 34 Z" />
                                            <path d="M 28 22 L 37 16 L 48 16 L 48 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 51 16 L 63 16 L 63 22 L 51 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <path d="M 66 16 L 76 16 L 82 22 L 66 22 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="19" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="19" cy="36" r="2" fill="currentColor" />
                                            <circle cx="83" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="83" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Convertible',
                                    icon: (
                                        <svg viewBox="0 0 100 48" className="w-16 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M 6 34 L 7 29 L 11 25 L 30 23 L 42 15" />
                                            <path d="M 30 23 L 44 24 L 73 24 L 78 25 L 89 25 L 92 32 L 89 36 L 84 36 A 8.5 8.5 0 0 0 67 36 L 31.5 36 A 8.5 8.5 0 0 0 14.5 36 L 8 36 L 6 34 Z" />
                                            <path d="M 41 23 L 43 20" strokeWidth="2" />
                                            <path d="M 49 24 L 49 18 Q 52 16 55 18 L 55 24" strokeWidth="1.8" />
                                            <path d="M 60 24 L 60 19 Q 63 17 66 19 L 66 24" strokeWidth="1.8" />
                                            <path d="M 33 23 L 42 17 L 44 23 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
                                            <circle cx="23" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="23" cy="36" r="2" fill="currentColor" />
                                            <circle cx="75.5" cy="36" r="6" strokeWidth="2" />
                                            <circle cx="75.5" cy="36" r="2" fill="currentColor" />
                                        </svg>
                                    )
                                },
                            ].map((type, i) => {
                                const isSelected = selectedBodyType?.toLowerCase() === type.name.toLowerCase();
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => handleBodyTypeSelect(type.name)}
                                        className={`flex flex-col items-center gap-2.5 rounded-xl py-4 px-2 transition-all duration-200 cursor-pointer group relative ${isSelected
                                                ? 'bg-[#1877F2] text-white shadow-lg shadow-blue-500/25 ring-2 ring-[#1877F2] ring-offset-2 scale-105'
                                                : 'bg-[#EEF4FF] hover:bg-[#deeaff] text-gray-700 hover:scale-[1.03]'
                                            }`}
                                    >
                                        <div className={`transition-colors ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                            {type.icon}
                                        </div>
                                        <span className={`text-[12px] text-center leading-tight transition-colors ${isSelected ? 'text-white font-bold' : 'text-gray-700 font-semibold'}`}>
                                            {type.name}
                                        </span>
                                        {isSelected && (
                                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white shadow animate-ping"></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ═══ WHY CHOOSE US ══════════════════════════════════════════ */}
                <section id="why-choose-us-section" className="bg-white py-6 overflow-hidden scroll-mt-10">
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
                                    We offer the best experience when buying or selling your car
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            ),
                                            title: 'Best market price guaranteed',
                                            desc: 'Looking for the best deal? We ensure competitive pricing and transparent market valuation for every car.'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            ),
                                            title: '150-Point Inspection',
                                            desc: 'Every car listed undergoes a thorough mechanical, electrical, and structural multi-point inspection.'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            ),
                                            title: 'Verified Ownership & Papers',
                                            desc: '100% verified BRTA documents, tax token, fitness, and seamless ownership transfer assistance.'
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            ),
                                            title: 'Dedicated Customer Support',
                                            desc: 'Have questions about a car? Contact CarBazar support team anytime for expert automotive guidance.'
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
                <section id="impressive-collection-section" className="bg-[#E6EEF6] pt-16 pb-24 scroll-mt-6">
                    <div className="max-w-[1220px] mx-auto px-6 lg:px-8">

                        {/* Section Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-[2.2rem] font-bold text-gray-900 mb-4 tracking-tight">Our Impressive Collection of Cars</h2>
                            <p className="text-gray-800 font-semibold text-[13px] max-w-2xl mx-auto leading-relaxed">
                                Ranging from elegant sedans to powerful sports cars, all carefully selected to provide<br className="hidden md:block" /> our customers with the ultimate driving experience.
                            </p>
                        </div>

                        {/* Active Filter Banner (when Brand or Body Type is active) */}
                        {(selectedBrand || selectedBodyType) && (
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur border border-blue-200/80 rounded-2xl px-6 py-3.5 mb-8 shadow-sm max-w-2xl mx-auto">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2] animate-pulse"></span>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {selectedBrand ? 'Filtered by Brand:' : 'Filtered by Body Type:'}
                                    </span>
                                    <span className="bg-[#1877F2] text-white font-bold text-xs px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                        <span>{selectedBrand || selectedBodyType}</span>
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">
                                        ({filteredCollectionCars.length} {filteredCollectionCars.length === 1 ? 'vehicle' : 'vehicles'} found)
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBrand(null);
                                        setSelectedBodyType(null);
                                    }}
                                    className="text-xs font-bold text-[#1877F2] hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer ml-auto"
                                >
                                    <span>Clear filter</span>
                                    <span>✕</span>
                                </button>
                            </div>
                        )}

                        {/* Tabs / Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                            {collectionTabs.map((tab) => {
                                const isActive = !selectedBrand && !selectedBodyType && activeCollectionTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => {
                                            setSelectedBrand(null);
                                            setSelectedBodyType(null);
                                            setActiveCollectionTab(tab);
                                        }}
                                        className={`px-6 py-2.5 rounded-full font-bold text-[13px] transition-all duration-200 shadow-sm cursor-pointer ${isActive
                                                ? 'bg-[#151515] text-white shadow-md scale-105 ring-2 ring-[#151515]/20'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200 hover:shadow'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Grid - 5 columns or Empty State */}
                        {filteredCollectionCars.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 transition-all duration-300">
                                {filteredCollectionCars.map((car, i) => (
                                    <CarCard key={car.id || car.slug || i} {...car} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-14 px-6 bg-white/90 backdrop-blur rounded-3xl border border-gray-200/80 text-center shadow-sm max-w-lg mx-auto">
                                <div className="w-16 h-16 bg-blue-50 text-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    🔍
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No matching cars found</h3>
                                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                                    We currently don't have vehicles matching "{selectedBrand || selectedBodyType}". Try clearing the filter to explore all available vehicles.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBrand(null);
                                        setSelectedBodyType(null);
                                    }}
                                    className="bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-md"
                                >
                                    Show All Vehicles
                                </button>
                            </div>
                        )}

                        {/* Bottom Button */}
                        <div className="flex justify-center mt-12">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedBrand(null);
                                    setSelectedBodyType(null);
                                    scrollToCollection();
                                }}
                                className="bg-[#1877F2] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-[14px] transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                            >
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
                                        <p className="text-gray-500 text-[12px] font-bold uppercase tracking-wider">
                                            Smart Car Buying &amp; Selling, Tailored For You
                                        </p>
                                    </div>
                                    <h2 className="text-[#1877F2] font-extrabold text-[2.6rem] leading-[1.1] tracking-tight mb-5">
                                        Drive your dream:<br />
                                        The CarBazar<br />
                                        Advantage
                                    </h2>
                                </div>
                                <p className="text-gray-900 font-bold text-[13px] leading-relaxed mb-6 pr-4">
                                    Immerse yourself in a world of verified vehicles. From fuel-efficient city sedans to rugged off-road SUVs and luxury family cruisers, CarBazar connects buyers and sellers with genuine vehicle specs, market-tested pricing, and 100% verified documentation.
                                </p>

                                {/* Highlights Grid */}
                                <div className="grid grid-cols-2 gap-2.5 mb-7 pr-4">
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>100% Verified Papers</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>Accident-Free Checks</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>Fair Market Pricing</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>BRTA Name Transfer</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3.5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedBrand(null);
                                            setSelectedBodyType(null);
                                            scrollToCollection();
                                        }}
                                        className="bg-[#1877F2] hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 shadow-md hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer group"
                                    >
                                        <span>Explore Available Cars</span>
                                        <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setBrandModalOpen(true)}
                                        className="border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 px-5 py-3 rounded-xl font-bold text-[13px] transition-colors cursor-pointer"
                                    >
                                        Filter by Brand
                                    </button>
                                </div>

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
                                        <p className="text-gray-500 text-[12px] font-bold uppercase tracking-wider">
                                            Certified Quality, Transparent Deals
                                        </p>
                                    </div>
                                    <h2 className="text-[#1877F2] font-extrabold text-[2.6rem] leading-[1.1] tracking-tight mb-5">
                                        Beyond Just Selling,<br />
                                        Building Trust
                                    </h2>
                                </div>
                                <p className="text-gray-900 font-bold text-[13px] leading-relaxed mb-6 pr-4">
                                    We are more than just a car marketplace. We strive to be your lifelong automotive partner, ensuring every buyer gets complete inspection visibility and every seller receives fair market valuation. Experience seamless transactions, test-drive coordination, and trusted ownership transfer with absolute peace of mind.
                                </p>

                                {/* Highlights Grid */}
                                <div className="grid grid-cols-2 gap-2.5 mb-7 pr-4">
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>150-Point Inspection</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>Direct Seller Connect</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>Instant Price Valuation</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 bg-[#F0F5FD] px-3 py-2 rounded-xl border border-blue-100/80">
                                        <span className="text-[#1877F2] text-sm font-black">✓</span>
                                        <span>Dedicated Support 24/7</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3.5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const section = document.getElementById('cars-section');
                                            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className="bg-[#1877F2] hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 shadow-md hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer group"
                                    >
                                        <span>View Featured Cars</span>
                                        <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const section = document.getElementById('how-it-works-section');
                                            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className="border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 px-5 py-3 rounded-xl font-bold text-[13px] transition-colors cursor-pointer"
                                    >
                                        How Buying Works
                                    </button>
                                </div>
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
                                    <span className="block sm:whitespace-nowrap">Nationwide Network, Local Showrooms:</span>
                                    <span className="block sm:whitespace-nowrap">Discover Our 120+ Partner Showrooms</span>
                                    <span className="block sm:whitespace-nowrap">&amp; Inspection Hubs</span>
                                </h2>
                                <p className="text-gray-900 font-bold text-[13px] leading-relaxed mb-8 max-w-[460px]">
                                    At CarBazar, we believe in making car buying and selling convenient and accessible wherever you are across Bangladesh. With over 120 partner showrooms and certified inspection hubs, our verified automobile specialists are always ready to assist you.
                                </p>
                                <a href="#cars-section" className="inline-block bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-[14px] px-8 py-3.5 rounded-lg transition-colors shadow-sm text-center">
                                    Find your nearest showroom
                                </a>
                            </div>

                            {/* Right Map Image */}
                            <div className="lg:w-[52%] flex justify-end items-center">
                                <img
                                    src="/images/locations-map.png"
                                    alt="CarBazar Showroom Locations Map"
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
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.18 2.57 7.77 6.23 9.26l1.13-2.83C6.94 17.3 5.5 14.86 5.5 12c0-3.59 2.91-6.5 6.5-6.5 2.86 0 5.3 1.56 6.43 3.86l2.83-1.13C19.77 4.57 16.18 2 12 2z" fill="currentColor" />
                                        <path d="M12 22c5.52 0 10-4.48 10-10 0-1.85-.5-3.58-1.38-5.07l-2.73 1.36c.69 1.14 1.11 2.47 1.11 3.71 0 3.59-2.91 6.5-6.5 6.5-1.24 0-2.57-.42-3.71-1.11l-1.36 2.73C9.42 21.5 11.15 22 12 22z" fill="currentColor" />
                                        <polygon points="9.5,8 16.5,12 9.5,16" fill="currentColor" />
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
                                            Gulshan 2, Dhaka - 1212,<br />Bangladesh.
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <span>+880 1700-123456</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                        <span>support@carbazar.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Our Product */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Our Marketplace</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><a href="#cars-section" className="hover:text-white transition-colors">Certified Cars</a></li>
                                    <li><a href="#impressive-collection-section" className="hover:text-white transition-colors">Brand New Cars</a></li>
                                    <li><a href="#how-it-works-section" className="hover:text-white transition-colors">Sell Your Car</a></li>
                                    <li><a href="#why-choose-us-section" className="hover:text-white transition-colors">Inspection Reports</a></li>
                                </ul>
                            </div>

                            {/* Column 3: Resources */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Resources</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><a href="#" className="hover:text-white transition-colors">Download App</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Help Centre</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Buying Guides</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Car Valuation</a></li>
                                </ul>
                            </div>

                            {/* Column 4: About CarBazar */}
                            <div className="min-w-[130px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">About CarBazar</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                                    <li><a href="#why-choose-us-section" className="hover:text-white transition-colors">Why choose us</a></li>
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
                        <div className="border-t border-[#0e2c4d] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-slate-400 w-full">
                            <p className="text-slate-300/80 text-[13px] font-normal tracking-wide">
                                Copyright 2024 • CarBazar, All Rights Reserved
                            </p>
                            <Link
                                href={route('admin.login')}
                                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium opacity-70 hover:opacity-100"
                            >
                                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Admin Portal</span>
                            </Link>
                        </div>
                    </div>
                </footer>

                {/* ═══ ALL BRANDS MODAL ════════════════════════════════════ */}
                {brandModalOpen && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setBrandModalOpen(false)}
                    >
                        <div
                            className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Explore All Car Brands</h3>
                                    <p className="text-xs text-gray-500 mt-1">Select any brand to instantly view available cars for sale</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setBrandModalOpen(false)}
                                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors font-bold text-sm cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                        🔍
                                    </span>
                                    <input
                                        type="text"
                                        value={brandModalSearch}
                                        onChange={(e) => setBrandModalSearch(e.target.value)}
                                        placeholder="Search brands (e.g. Toyota, BMW, Audi, Ferrari, Nissan...)"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-blue-100 bg-white"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Brands Grid */}
                            <div className="p-6 overflow-y-auto flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Available Brands ({CAR_BRANDS.filter(b => b.name.toLowerCase().includes(brandModalSearch.toLowerCase().trim())).length})
                                    </span>
                                    {selectedBrand && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedBrand(null);
                                                setBrandModalOpen(false);
                                                scrollToCollection();
                                            }}
                                            className="text-xs font-bold text-[#1877F2] hover:underline cursor-pointer"
                                        >
                                            Show All Brands (Clear)
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                                    {CAR_BRANDS
                                        .filter(b => b.name.toLowerCase().includes(brandModalSearch.toLowerCase().trim()))
                                        .map((b) => {
                                            const isSelected = selectedBrand?.toLowerCase() === b.name.toLowerCase();
                                            return (
                                                <button
                                                    key={b.name}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedBrand(b.name);
                                                        setSelectedBodyType(null);
                                                        setBrandModalOpen(false);
                                                        scrollToCollection();
                                                    }}
                                                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${isSelected
                                                            ? 'bg-[#1877F2] text-white border-[#1877F2] shadow-md scale-[1.02]'
                                                            : 'bg-white hover:bg-blue-50/70 border-gray-200 text-gray-700 hover:border-blue-200'
                                                        }`}
                                                >
                                                    <span className="truncate">{b.name}</span>
                                                    {isSelected ? (
                                                        <span className="text-white font-bold ml-1">✓</span>
                                                    ) : b.popular ? (
                                                        <span className="text-[10px] bg-blue-100/70 text-[#1877F2] px-1.5 py-0.5 rounded font-medium ml-1">Hot</span>
                                                    ) : null}
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs text-gray-500">Clicking any brand automatically filters the cars for sale</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBrand(null);
                                        setBrandModalOpen(false);
                                        scrollToCollection();
                                    }}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
