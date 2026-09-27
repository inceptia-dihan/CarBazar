import React, { useState, useMemo, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import HeroCarFilter from '@/Components/HeroCarFilter';
import { CAR_BRANDS } from '@/data/carBrandsModels';

// ─── Slug to Full Selling Price Mapping (matching CarDetails page) ────────────
const slugSellingPrices = {
    'toyota-corolla-cross-hybrid-2021': '৳ 37,00,000',
    'jaguar-xe-l-p250': '৳ 48,00,000',
    'audi-r8': '৳ 1,85,00,000',
    'bmw-m3': '৳ 1,35,00,000',
    'lamborghini-huracan': '৳ 2,90,00,000',
    '2023-lexus-es-350-9mkwd': '৳ 1,845,000',
    'volvo-xc90-recharge-2023': '৳ 95,00,000',
    'jeep-wrangler-rubicon-392-2023': '৳ 88,00,000',
    'ferrari-dino-246-gt-classic': '৳ 3,50,00,000',
    'chevrolet-corvette-stingray-2023': '৳ 1,45,00,000',
    'volkswagen-golf-gti-2023': '৳ 55,00,000',
    'honda-civic-type-r-2023': '৳ 78,00,000',
    'nissan-gt-r-nismo-2022': '৳ 1,75,00,000',
    'mercedes-benz-s500-limousine-2023': '৳ 2,40,00,000',
    'hyundai-tucson-hybrid-2023': '৳ 42,00,000',
    'kia-sportage-x-line-2023': '৳ 44,00,000',
    'ford-mustang-gt-convertible-2023': '৳ 95,00,000',
    'tesla-model-3-performance-2023': '৳ 82,00,000',
    'audi-rs6-avant-performance-2023': '৳ 1,90,00,000',
};

const getDisplaySellingPrice = (carItem = {}, slugKey = '') => {
    // 1. Explicit askingPrice
    const ask = carItem.askingPrice || carItem.asking_price;
    if (ask && typeof ask === 'string' && ask.trim()) {
        const trimmed = ask.trim();
        return trimmed.startsWith('৳') ? trimmed : `৳ ${trimmed}`;
    }

    // 2. Known slug map matching CarDetails
    const targetSlug = slugKey || carItem.slug;
    if (targetSlug && slugSellingPrices[targetSlug]) {
        return slugSellingPrices[targetSlug];
    }

    // 3. Price Lakh format
    const lakh = carItem.priceLakh || carItem.price_lakh;
    if (lakh) {
        return lakh.startsWith('৳') ? lakh : `৳ ${lakh}`;
    }

    // 4. Numerical price if > 50,000 (selling price in Taka)
    if (carItem.price) {
        const numOnly = Number(String(carItem.price).replace(/[^0-9]/g, ''));
        if (numOnly > 50000) {
            return `৳ ${numOnly.toLocaleString('en-IN')}`;
        }
    }

    return '৳ 35,00,000';
};

// ─── Car Card for Collection ──────────────────────────────────────────────────
const CarCard = (props) => {
    const { image, mainImage, main_image, name, slug = 'toyota-corolla-cross-hybrid-2021', rating, reviews, passengers, doors, user_id } = props;
    const cardImg = image || mainImage || main_image || '/images/hero-car.jpg';
    const formattedPrice = getDisplaySellingPrice(props, slug);
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

export default function Cars({ auth, collectionCars: dbCollectionCars, initialFilters = {} }) {
    const defaultCollectionCars = [
        { image: '/images/hero-car.jpg', name: '2023 Lexus ES 350', slug: '2023-lexus-es-350-9mkwd', brand: 'Lexus', bodyType: 'Sedan', price: '1,845,000', priceLakh: '৳ 1,845,000', rating: '5.0', reviews: '1', passengers: 5, doors: 4, category: 'popular,luxury' },
        { image: '/images/hero-car.jpg', name: 'Chevrolet Corvette Stingray 3LT V8', slug: 'chevrolet-corvette-stingray-2023', brand: 'Chevrolet', bodyType: 'Sport Coupe', price: '2,800', priceLakh: '৳ 1,45,00,000', rating: '4.9', reviews: '1,420', passengers: 2, doors: 2, category: 'luxury,popular' },
        { image: '/images/corolla-cross-2.jpg', name: 'Volkswagen Golf GTI Performance Mk8', slug: 'volkswagen-golf-gti-2023', brand: 'Volkswagen', bodyType: 'Compact', price: '1,500', priceLakh: '৳ 55,00,000', rating: '4.7', reviews: '1,890', passengers: 5, doors: 4, category: 'popular' },
        { image: '/images/bmw-car.jpg', name: 'Honda Civic Type R FL5 Turbo', slug: 'honda-civic-type-r-2023', brand: 'Honda', bodyType: 'Compact', price: '1,900', priceLakh: '৳ 78,00,000', rating: '4.9', reviews: '2,150', passengers: 4, doors: 4, category: 'popular,luxury' },
        { image: '/images/audi-car.jpg', name: 'Nissan GT-R Nismo Track Edition', slug: 'nissan-gt-r-nismo-2022', brand: 'Nissan', bodyType: 'Sport Coupe', price: '2,700', priceLakh: '৳ 1,75,00,000', rating: '4.9', reviews: '1,980', passengers: 4, doors: 2, category: 'luxury,popular' },
        { image: '/images/hero-car.jpg', name: 'Mercedes-Benz S500 4MATIC Limousine', slug: 'mercedes-benz-s500-limousine-2023', brand: 'Mercedes-Benz', bodyType: 'Limousine', price: '3,200', priceLakh: '৳ 2,40,00,000', rating: '5.0', reviews: '1,720', passengers: 5, doors: 4, category: 'luxury,popular' },
        { image: '/images/corolla-cross-1.jpg', name: 'Hyundai Tucson Hybrid HTRAC Crossover', slug: 'hyundai-tucson-hybrid-2023', brand: 'Hyundai', bodyType: 'Crossover', price: '1,600', priceLakh: '৳ 42,00,000', rating: '4.7', reviews: '1,640', passengers: 5, doors: 4, category: 'popular,family' },
        { image: '/images/corolla-cross-3.jpg', name: 'Kia Sportage X-Line AWD Crossover', slug: 'kia-sportage-x-line-2023', brand: 'Kia', bodyType: 'Crossover', price: '1,700', priceLakh: '৳ 44,00,000', rating: '4.8', reviews: '1,530', passengers: 5, doors: 4, category: 'popular,family' },
        { image: '/images/bmw-car.png', name: 'Ford Mustang GT Premium Convertible', slug: 'ford-mustang-gt-convertible-2023', brand: 'Ford', bodyType: 'Convertible', price: '2,400', priceLakh: '৳ 95,00,000', rating: '4.8', reviews: '1,890', passengers: 4, doors: 2, category: 'luxury,popular' },
        { image: '/images/hero-car.jpg', name: 'Tesla Model 3 Performance AWD', slug: 'tesla-model-3-performance-2023', brand: 'Tesla', bodyType: 'Sedan', price: '2,100', priceLakh: '৳ 82,00,000', rating: '4.9', reviews: '2,310', passengers: 5, doors: 4, category: 'popular,luxury' },
        { image: '/images/audi-car.jpg', name: 'Audi RS6 Avant Performance Wagon', slug: 'audi-rs6-avant-performance-2023', brand: 'Audi', bodyType: 'Wagon', price: '2,900', priceLakh: '৳ 1,90,00,000', rating: '5.0', reviews: '1,430', passengers: 5, doors: 5, category: 'luxury,family' },
        { image: '/images/audi-car.jpg', name: 'Audi R8 Performance', slug: 'audi-r8', brand: 'Audi', bodyType: 'Sport Coupe', price: '2,100', priceLakh: '৳ 1,85,00,000', rating: '4.6', reviews: '1,936', passengers: 2, doors: 2, category: 'luxury' },
        { image: '/images/bmw-car.jpg', name: 'BMW M3 Competition', slug: 'bmw-m3', brand: 'BMW', bodyType: 'Sedan', price: '1,600', priceLakh: '৳ 1,35,00,000', rating: '4.5', reviews: '2,036', passengers: 4, doors: 4, category: 'popular,luxury' },
        { image: '/images/lamborghini-car.jpg', name: 'Lamborghini Huracán EVO', slug: 'lamborghini-huracan', brand: 'Lamborghini', bodyType: 'Coup', price: '2,300', priceLakh: '৳ 2,90,00,000', rating: '4.3', reviews: '2,236', passengers: 2, doors: 2, category: 'luxury' },
        { image: '/images/volvo-car.jpg', name: 'Volvo XC90 Recharge 7-Seater', slug: 'volvo-xc90-recharge-2023', brand: 'Volvo', bodyType: 'Family MBP', price: '2,200', priceLakh: '৳ 95,00,000', rating: '4.9', reviews: '1,420', passengers: 7, doors: 4, category: 'family,luxury' },
        { image: '/images/jeep-car.jpg', name: 'Jeep Wrangler Rubicon 4x4', slug: 'jeep-wrangler-rubicon-392-2023', brand: 'Jeep', bodyType: 'SUV', price: '2,400', priceLakh: '৳ 88,00,000', rating: '4.8', reviews: '1,830', passengers: 5, doors: 4, category: 'off-road,popular' },
        { image: '/images/ferrari-car.jpg', name: '1974 Ferrari Dino 246 GT', slug: 'ferrari-dino-246-gt-classic', brand: 'Ferrari', bodyType: 'Coup', price: '3,500', priceLakh: '৳ 3,50,00,000', rating: '5.0', reviews: '980', passengers: 2, doors: 2, category: 'vintage,luxury' },
        { image: '/images/corolla-cross-1.jpg', name: 'Toyota Corolla Cross Hybrid', slug: 'toyota-corolla-cross-hybrid-2021', brand: 'Toyota', bodyType: 'SUV', price: '2,500', priceLakh: '৳ 37,00,000', rating: '4.9', reviews: '2,436', passengers: 5, doors: 4, category: 'popular,family' },
        { image: '/images/hero-car.jpg', name: 'Jaguar XE L P250', slug: 'jaguar-xe-l-p250', brand: 'Jaguar', bodyType: 'Sedan', price: '1,800', priceLakh: '৳ 48,00,000', rating: '4.8', reviews: '2,436', passengers: 4, doors: 4, category: 'luxury,popular' },
    ];

    const allCars = useMemo(() => {
        if (!dbCollectionCars || dbCollectionCars.length === 0) {
            return defaultCollectionCars;
        }
        // Merge DB cars first, then default cars that don't collide on slug
        const dbSlugs = new Set(dbCollectionCars.map(c => c.slug));
        const nonDuplicateDefaults = defaultCollectionCars.filter(c => !dbSlugs.has(c.slug));
        return [...dbCollectionCars, ...nonDuplicateDefaults];
    }, [dbCollectionCars]);

    // Parse URL search params if present
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

    // Filters state
    const [selectedBrand, setSelectedBrand] = useState(initialFilters.brand || urlParams.get('brand') || '');
    const [selectedModel, setSelectedModel] = useState(initialFilters.model || urlParams.get('model') || '');
    const [selectedBodyType, setSelectedBodyType] = useState(initialFilters.bodyType || urlParams.get('bodyType') || '');
    const [selectedCondition, setSelectedCondition] = useState(initialFilters.condition || urlParams.get('condition') || 'all');
    const [minPrice, setMinPrice] = useState(initialFilters.minPrice || urlParams.get('minPrice') || null);
    const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || urlParams.get('maxPrice') || null);
    const [activeCollectionTab, setActiveCollectionTab] = useState('All Cars');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const collectionTabs = ['All Cars', 'Popular Car', 'Luxury Car', 'Vintage Car', 'Family Car', 'Off-Road Car'];
    const tabKeyMap = {
        'All Cars': 'all',
        'Popular Car': 'popular',
        'Luxury Car': 'luxury',
        'Vintage Car': 'vintage',
        'Family Car': 'family',
        'Off-Road Car': 'off-road',
    };

    // Filter cars
    const filteredCars = useMemo(() => {
        let list = allCars;

        // 1. Brand filter
        if (selectedBrand) {
            const bNorm = selectedBrand.toLowerCase().replace(/[^a-z0-9]/g, '');
            list = list.filter(car => {
                const b = (car.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const n = (car.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const s = (car.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                return b.includes(bNorm) || n.includes(bNorm) || s.includes(bNorm);
            });
        }

        // 2. Model filter
        if (selectedModel) {
            const mNorm = selectedModel.toLowerCase().trim();
            list = list.filter(car => {
                const n = (car.name || '').toLowerCase();
                const m = (car.model || '').toLowerCase();
                const s = (car.slug || '').toLowerCase();
                return n.includes(mNorm) || m.includes(mNorm) || s.includes(mNorm);
            });
        }

        // 3. Body type filter
        if (selectedBodyType) {
            const tNorm = selectedBodyType.toLowerCase().trim();
            list = list.filter(car => {
                const bType = (car.bodyType || car.body_type || '').toLowerCase();
                const name = (car.name || '').toLowerCase();
                const slug = (car.slug || '').toLowerCase();
                const cat = (car.category || '').toLowerCase();

                if (tNorm === 'suv') return bType.includes('suv') || name.includes('suv') || name.includes('cross') || slug.includes('wrangler');
                if (tNorm === 'crossover') return bType.includes('crossover') || name.includes('crossover') || name.includes('tucson') || name.includes('sportage');
                if (tNorm === 'sedan') return bType.includes('sedan') || name.includes('sedan') || slug.includes('es-350') || slug.includes('jaguar') || slug.includes('m3') || slug.includes('s500') || slug.includes('tesla');
                if (tNorm === 'coupe' || tNorm === 'coup' || tNorm === 'sport coupe') return bType.includes('coup') || name.includes('coupe') || slug.includes('corvette') || slug.includes('r8') || slug.includes('huracan') || slug.includes('gt-r');
                if (tNorm === 'compact' || tNorm === 'hatchback') return bType.includes('compact') || name.includes('golf') || name.includes('civic');
                if (tNorm === 'wagon') return bType.includes('wagon') || name.includes('avant') || slug.includes('avant');
                if (tNorm === 'convertible') return bType.includes('convertible') || name.includes('convertible') || slug.includes('mustang');
                return bType.includes(tNorm) || name.includes(tNorm);
            });
        }

        // 4. Condition filter
        if (selectedCondition && selectedCondition !== 'all') {
            const condNorm = selectedCondition.toLowerCase();
            list = list.filter(car => {
                const c = (car.condition || '').toLowerCase();
                const cat = (car.category || '').toLowerCase();
                if (condNorm === 'vintage') return c.includes('vintage') || cat.includes('vintage') || (car.name || '').includes('1974');
                if (condNorm === 'brand-new') return c.includes('new') || !car.user_id;
                if (condNorm === 'used' || condNorm === 'reconditioned') return c.includes(condNorm) || Boolean(car.user_id);
                return true;
            });
        }

        // 5. Price filter
        if (minPrice || maxPrice) {
            const min = minPrice ? Number(minPrice) : 0;
            const max = maxPrice ? Number(maxPrice) : Infinity;
            list = list.filter(car => {
                let pNum = 0;
                if (car.price) {
                    pNum = Number(String(car.price).replace(/[^0-9]/g, ''));
                } else if (car.priceLakh || car.price_lakh) {
                    pNum = Number(String(car.priceLakh || car.price_lakh).replace(/[^0-9]/g, ''));
                }
                if (pNum === 0) return true;
                // If stored in lakhs e.g. 35,00,000 vs 3500
                if (pNum < 10000) pNum = pNum * 1000;
                return pNum >= min && pNum <= max;
            });
        }

        // 6. Category tab filter
        const key = tabKeyMap[activeCollectionTab];
        if (key && key !== 'all') {
            list = list.filter(car => {
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
        }

        return list;
    }, [allCars, selectedBrand, selectedModel, selectedBodyType, selectedCondition, minPrice, maxPrice, activeCollectionTab]);

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrand, selectedModel, selectedBodyType, selectedCondition, minPrice, maxPrice, activeCollectionTab]);

    // Total pages & Paginated slice
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage) || 1;
    const paginatedCars = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCars.slice(start, start + itemsPerPage);
    }, [filteredCars, currentPage, itemsPerPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            const el = document.getElementById('cars-collection-top');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleClearAllFilters = () => {
        setSelectedBrand('');
        setSelectedModel('');
        setSelectedBodyType('');
        setSelectedCondition('all');
        setMinPrice(null);
        setMaxPrice(null);
        setActiveCollectionTab('All Cars');
        try {
            window.history.pushState({}, '', '/cars');
        } catch (e) {}
    };

    const hasActiveFilters = Boolean(selectedBrand || selectedModel || selectedBodyType || (selectedCondition && selectedCondition !== 'all') || minPrice || maxPrice || activeCollectionTab !== 'All Cars');

    return (
        <>
            <Head title="Our Impressive Collection of Cars - CarBazar" />

            <div className="min-h-screen bg-[#F0F4F8] font-sans flex flex-col justify-between">
                <div>
                    {/* ═══ NAVBAR (Consistent with Home Page) ════════════════════ */}
                    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-50">
                        <div className="w-full px-6 lg:px-16 flex items-center justify-between h-[70px]">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                    </svg>
                                </div>
                                <span className="text-[#1877F2] font-black text-[20px] tracking-tight">CarBazar</span>
                            </Link>

                            {/* Nav Links */}
                            <nav className="hidden lg:flex items-center gap-9 text-[14px] font-semibold text-gray-800">
                                <Link href="/" className="hover:text-[#1877F2] transition-colors">Home</Link>
                                <Link href="/cars" className="text-[#1877F2] font-bold">All Cars</Link>
                                <Link href="/#how-it-works-section" className="hover:text-[#1877F2] transition-colors">How it works</Link>
                                <Link href="/#why-choose-us-section" className="hover:text-[#1877F2] transition-colors">Why choose us</Link>
                            </nav>

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
                    </header>

                    {/* ═══ HERO / SEARCH FILTER SECTION ══════════════════════════ */}
                    <div className="bg-[#E6EEF6] pt-10 pb-16 border-b border-blue-100/60 relative">
                        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
                            {/* Breadcrumb & Heading */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                        <Link href="/" className="hover:text-[#1877F2] transition-colors">Home</Link>
                                        <span>/</span>
                                        <span className="text-[#1877F2]">Cars Collection</span>
                                    </div>
                                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                                        Explore Vehicles For Sale
                                    </h1>
                                    <p className="text-gray-600 text-sm mt-1.5 max-w-xl">
                                        Find verified used and brand new cars with authentic inspection reports, verified seller profiles, and best market pricing in Bangladesh.
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="inline-block bg-white text-[#1877F2] border border-blue-200/80 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                                        {filteredCars.length} {filteredCars.length === 1 ? 'Car Available' : 'Cars Available'}
                                    </span>
                                </div>
                            </div>

                            {/* Integrated Hero Filter */}
                            <div className="w-full">
                                <HeroCarFilter
                                    onSearch={(filters) => {
                                        if (filters?.brand) setSelectedBrand(filters.brand);
                                        if (filters?.model) setSelectedModel(filters.model);
                                        if (filters?.condition?.id) setSelectedCondition(filters.condition.id);
                                        if (filters?.price?.min !== undefined) setMinPrice(filters.price.min);
                                        if (filters?.price?.max !== undefined) setMaxPrice(filters.price.max);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ═══ SECTION: OUR IMPRESSIVE COLLECTION OF CARS ════════════ */}
                    <main id="cars-collection-top" className="max-w-[1240px] mx-auto px-6 lg:px-8 pt-12 pb-24 scroll-mt-20">

                        {/* Section Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-[2.2rem] font-bold text-gray-900 mb-3 tracking-tight">
                                Our Impressive Collection of Cars
                            </h2>
                            <p className="text-gray-700 font-semibold text-[13px] max-w-2xl mx-auto leading-relaxed">
                                Ranging from elegant sedans to powerful sports cars, all carefully selected to provide<br className="hidden md:block" /> our customers with the ultimate driving experience.
                            </p>
                        </div>

                        {/* Active Filter Chips Banner */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-blue-200/80 rounded-2xl px-6 py-3.5 mb-8 shadow-sm">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2] animate-pulse"></span>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">
                                        Filters:
                                    </span>

                                    {selectedBrand && (
                                        <span className="bg-[#1877F2] text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                            <span>Brand: {selectedBrand}</span>
                                            <button type="button" onClick={() => setSelectedBrand('')} className="hover:text-red-200">✕</button>
                                        </span>
                                    )}

                                    {selectedModel && (
                                        <span className="bg-[#1877F2] text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                            <span>Model: {selectedModel}</span>
                                            <button type="button" onClick={() => setSelectedModel('')} className="hover:text-red-200">✕</button>
                                        </span>
                                    )}

                                    {selectedBodyType && (
                                        <span className="bg-[#1877F2] text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                            <span>Type: {selectedBodyType}</span>
                                            <button type="button" onClick={() => setSelectedBodyType('')} className="hover:text-red-200">✕</button>
                                        </span>
                                    )}

                                    {selectedCondition && selectedCondition !== 'all' && (
                                        <span className="bg-[#1877F2] text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                            <span>Condition: {selectedCondition}</span>
                                            <button type="button" onClick={() => setSelectedCondition('all')} className="hover:text-red-200">✕</button>
                                        </span>
                                    )}

                                    {activeCollectionTab !== 'All Cars' && (
                                        <span className="bg-slate-800 text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                            <span>{activeCollectionTab}</span>
                                            <button type="button" onClick={() => setActiveCollectionTab('All Cars')} className="hover:text-red-200">✕</button>
                                        </span>
                                    )}

                                    <span className="text-xs text-gray-500 font-medium ml-2">
                                        ({filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} found)
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleClearAllFilters}
                                    className="text-xs font-bold text-[#1877F2] hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer ml-auto"
                                >
                                    <span>Clear all filters</span>
                                    <span>✕</span>
                                </button>
                            </div>
                        )}

                        {/* Category Tabs / Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                            {collectionTabs.map((tab) => {
                                const isActive = activeCollectionTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => {
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

                        {/* Car Grid or Empty State */}
                        {paginatedCars.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 transition-all duration-300">
                                    {paginatedCars.map((car, i) => (
                                        <CarCard key={car.id || car.slug || i} {...car} />
                                    ))}
                                </div>

                                {/* ═══ PAGINATION SYSTEM ═══ */}
                                {totalPages > 1 && (
                                    <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200/80 pt-8">
                                        <div className="text-xs font-semibold text-gray-500">
                                            Showing <span className="font-bold text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-800">{Math.min(currentPage * itemsPerPage, filteredCars.length)}</span> of <span className="font-bold text-gray-800">{filteredCars.length}</span> cars
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            {/* Previous button */}
                                            <button
                                                type="button"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                                    currentPage === 1
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/60'
                                                        : 'bg-white text-gray-700 hover:bg-[#1877F2] hover:text-white border border-gray-200 shadow-sm hover:shadow'
                                                }`}
                                            >
                                                <span>←</span>
                                                <span>Previous</span>
                                            </button>

                                            {/* Page numbers */}
                                            {Array.from({ length: totalPages }).map((_, idx) => {
                                                const pageNum = idx + 1;
                                                const isActive = currentPage === pageNum;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        type="button"
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all shadow-sm ${
                                                            isActive
                                                                ? 'bg-[#1877F2] text-white shadow-md scale-105 ring-2 ring-[#1877F2]/20'
                                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}

                                            {/* Next button */}
                                            <button
                                                type="button"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                                    currentPage === totalPages
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/60'
                                                        : 'bg-white text-gray-700 hover:bg-[#1877F2] hover:text-white border border-gray-200 shadow-sm hover:shadow'
                                                }`}
                                            >
                                                <span>Next</span>
                                                <span>→</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-16 px-6 bg-white rounded-3xl border border-gray-200 text-center shadow-sm max-w-lg mx-auto">
                                <div className="w-16 h-16 bg-blue-50 text-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    🔍
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No matching cars found</h3>
                                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                                    We couldn't find any vehicles matching your current filter criteria. Try adjusting or clearing your filters to explore our full garage.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClearAllFilters}
                                    className="bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-md"
                                >
                                    Show All Vehicles
                                </button>
                            </div>
                        )}
                    </main>
                </div>

                {/* ═══ FOOTER (Consistent with Home Page) ══════════════════════ */}
                <footer className="bg-[#0B1E34] text-white pt-16 pb-12 w-full">
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-14">
                            {/* Column 1: Brand Info */}
                            <div className="lg:col-span-1">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-7 h-7 bg-[#1877F2] rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                        </svg>
                                    </div>
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
                                    <li><Link href="/cars" className="hover:text-white transition-colors">Certified Cars</Link></li>
                                    <li><Link href="/cars" className="hover:text-white transition-colors">Brand New Cars</Link></li>
                                    <li><Link href="/#how-it-works-section" className="hover:text-white transition-colors">Sell Your Car</Link></li>
                                    <li><Link href="/#why-choose-us-section" className="hover:text-white transition-colors">Inspection Reports</Link></li>
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
                                    <li><Link href="/#why-choose-us-section" className="hover:text-white transition-colors">Why choose us</Link></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Press Center</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
                                </ul>
                            </div>

                            {/* Column 5: Follow Us */}
                            <div className="min-w-[120px]">
                                <h4 className="text-white font-medium text-[15px] mb-4">Follow Us</h4>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <a href="#" aria-label="Facebook" className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03.7-1.5 1.5-1.5H18V2.3c-.6-.08-1.5-.15-2.6-.15-2.7 0-4.4 1.6-4.4 4.6v2.75H8v4h3V22h3v-8.5z" /></svg>
                                    </a>
                                    <a href="#" aria-label="Instagram" className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors">
                                        <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" /></svg>
                                    </a>
                                    <a href="#" aria-label="YouTube" className="w-7 h-7 rounded-[7px] border border-slate-400/70 hover:border-white hover:text-white flex items-center justify-center transition-colors">
                                        <svg className="w-3.5 h-3.5 fill-none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="4" ry="4" /><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Copyright */}
                        <div className="border-t border-[#0e2c4d] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-slate-400 w-full">
                            <p className="text-slate-300/80 text-[13px] font-normal tracking-wide">
                                Copyright 2024 • CarBazar, All Rights Reserved
                            </p>
                            <Link href={route('admin.login')} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium opacity-70 hover:opacity-100">
                                <span>Admin Login</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
