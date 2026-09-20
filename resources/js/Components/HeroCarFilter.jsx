import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CAR_BRANDS, PRICE_RANGES, CAR_CONDITIONS } from '@/data/carBrandsModels';

export default function HeroCarFilter({ onSearch }) {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
    const [selectedCondition, setSelectedCondition] = useState(CAR_CONDITIONS[0]);

    // Active open dropdown: 'brand' | 'model' | 'price' | 'condition' | null
    const [openDropdown, setOpenDropdown] = useState(null);

    // Search query inputs inside dropdowns
    const [brandSearch, setBrandSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');

    // Custom price min/max inputs
    const [customMin, setCustomMin] = useState('');
    const [customMax, setCustomMax] = useState('');

    const containerRef = useRef(null);
    const brandInputRef = useRef(null);
    const modelInputRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (openDropdown === 'brand') {
            setTimeout(() => brandInputRef.current?.focus(), 50);
        } else if (openDropdown === 'model') {
            setTimeout(() => modelInputRef.current?.focus(), 50);
        }
    }, [openDropdown]);

    // Filtered Brands
    const filteredBrands = useMemo(() => {
        if (!brandSearch.trim()) return CAR_BRANDS;
        const q = brandSearch.toLowerCase().trim();
        return CAR_BRANDS.filter(b => b.name.toLowerCase().includes(q));
    }, [brandSearch]);

    // Available models for currently selected brand
    const availableModels = useMemo(() => {
        if (selectedBrand) {
            const brandObj = CAR_BRANDS.find(b => b.name.toLowerCase() === selectedBrand.toLowerCase());
            return brandObj ? brandObj.models : [];
        }
        // If no brand selected, aggregate all models with their brand
        return CAR_BRANDS.flatMap(b => b.models.map(m => ({ model: m, brand: b.name })));
    }, [selectedBrand]);

    // Filtered Models
    const filteredModels = useMemo(() => {
        const q = modelSearch.toLowerCase().trim();
        if (selectedBrand) {
            if (!q) return availableModels;
            return availableModels.filter(m => m.toLowerCase().includes(q));
        } else {
            if (!q) {
                return availableModels.slice(0, 30);
            }
            return availableModels.filter(item =>
                item.model.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q)
            );
        }
    }, [availableModels, modelSearch, selectedBrand]);

    const handleSelectBrand = (brandName) => {
        setSelectedBrand(brandName);
        setSelectedModel(''); // reset model when brand changes
        setBrandSearch('');
        setOpenDropdown('model'); // open model dropdown upwards
    };

    const handleSelectModel = (modelName, brandOfModel = null) => {
        setSelectedModel(modelName);
        if (brandOfModel && !selectedBrand) {
            setSelectedBrand(brandOfModel);
        }
        setModelSearch('');
        setOpenDropdown(null);
    };

    const formatTk = (amount) => {
        if (!amount && amount !== 0) return '';
        if (amount >= 10000000) {
            const cr = (amount / 10000000).toFixed(2).replace(/\.?0+$/, '');
            return `${cr} Crore Tk`;
        }
        if (amount >= 100000) {
            const lakh = (amount / 100000).toFixed(2).replace(/\.?0+$/, '');
            return `${lakh} Lakh Tk`;
        }
        return `৳${amount.toLocaleString('en-IN')}`;
    };

    const handleApplyCustomPrice = (e) => {
        e.preventDefault();
        const minVal = parseInt(customMin) || 0;
        const maxVal = parseInt(customMax) || null;
        let label = '';
        if (maxVal && minVal > 0) {
            label = `${formatTk(minVal)} - ${formatTk(maxVal)}`;
        } else if (maxVal) {
            label = `Under ${formatTk(maxVal)}`;
        } else if (minVal > 0) {
            label = `Over ${formatTk(minVal)}`;
        } else {
            label = 'All Prices (Any Tk)';
        }
        setSelectedPrice({ label, min: minVal, max: maxVal });
        setOpenDropdown(null);
    };

    const handleReset = (e) => {
        e.stopPropagation();
        setSelectedBrand('');
        setSelectedModel('');
        setSelectedPrice(PRICE_RANGES[0]);
        setSelectedCondition(CAR_CONDITIONS[0]);
        setBrandSearch('');
        setModelSearch('');
        setCustomMin('');
        setCustomMax('');
        setOpenDropdown(null);
    };

    const handleSearchClick = () => {
        setOpenDropdown(null);
        if (onSearch) {
            onSearch({
                brand: selectedBrand,
                model: selectedModel,
                price: selectedPrice,
                condition: selectedCondition
            });
        }
    };

    const hasActiveFilters = selectedBrand || selectedModel || selectedPrice.min !== null || selectedCondition.id !== 'all';

    return (
        <div ref={containerRef} className="relative w-full z-40">
            {/* Main Filter Bar Card */}
            <div className="bg-white rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.13)] border border-gray-100/80 p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">

                    {/* ═══ 1. BRAND DROPDOWN (OPENS UPWARDS) ═══ */}
                    <div className="relative flex-1 lg:border-r border-gray-200/80 lg:pr-4">
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(openDropdown === 'brand' ? null : 'brand')}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3.5 ${openDropdown === 'brand' ? 'bg-blue-50/70 ring-2 ring-[#1877F2]/20' : 'hover:bg-gray-50/80'}`}
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                                    Brand
                                </div>
                                <div className="font-bold text-[14px] text-gray-900 truncate">
                                    {selectedBrand || <span className="text-gray-400 font-normal">All Brands</span>}
                                </div>
                            </div>

                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'brand' ? 'rotate-180 text-[#1877F2]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Brand Popover - Opens UPWARDS */}
                        {openDropdown === 'brand' && (
                            <div className="absolute bottom-full left-0 mb-3 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_-12px_45px_rgba(0,0,0,0.18)] border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                                {/* Search input */}
                                <div className="relative mb-2">
                                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        ref={brandInputRef}
                                        type="text"
                                        value={brandSearch}
                                        onChange={(e) => setBrandSearch(e.target.value)}
                                        placeholder="Search 50+ world brands..."
                                        className="w-full pl-9 pr-8 py-2 text-[13px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors"
                                    />
                                    {brandSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setBrandSearch('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* "All Brands" option */}
                                <div className="border-b border-gray-100 pb-1 mb-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedBrand('');
                                            setSelectedModel('');
                                            setOpenDropdown(null);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-semibold flex items-center justify-between transition-colors ${!selectedBrand ? 'bg-blue-50 text-[#1877F2]' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <span>All Brands (Any Make)</span>
                                        {!selectedBrand && (
                                            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        )}
                                    </button>
                                </div>

                                {/* Brands list */}
                                <div className="max-h-[260px] overflow-y-auto space-y-0.5 pr-1 text-sm custom-scrollbar">
                                    {filteredBrands.length === 0 ? (
                                        <div className="py-6 text-center text-xs text-gray-400">
                                            No brands found matching "{brandSearch}"
                                        </div>
                                    ) : (
                                        filteredBrands.map((brand) => (
                                            <button
                                                key={brand.name}
                                                type="button"
                                                onClick={() => handleSelectBrand(brand.name)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-[13px] flex items-center justify-between transition-colors ${selectedBrand === brand.name ? 'bg-blue-50 text-[#1877F2] font-bold' : 'text-gray-700 hover:bg-gray-50 font-medium'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span>{brand.name}</span>
                                                    {brand.popular && (
                                                        <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-semibold">
                                                            Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[11px] text-gray-400 font-normal">
                                                    {brand.models.length} models
                                                </span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ═══ 2. MODEL DROPDOWN (OPENS UPWARDS) ═══ */}
                    <div className="relative flex-1 lg:border-r border-gray-200/80 lg:px-4">
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(openDropdown === 'model' ? null : 'model')}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3.5 ${openDropdown === 'model' ? 'bg-blue-50/70 ring-2 ring-[#1877F2]/20' : 'hover:bg-gray-50/80'}`}
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                                    Model {selectedBrand && <span className="text-[#1877F2] font-semibold">({selectedBrand})</span>}
                                </div>
                                <div className="font-bold text-[14px] text-gray-900 truncate">
                                    {selectedModel || (selectedBrand ? <span className="text-gray-400 font-normal">All {selectedBrand} Models</span> : <span className="text-gray-400 font-normal">All Models</span>)}
                                </div>
                            </div>

                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'model' ? 'rotate-180 text-[#1877F2]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Model Popover - Opens UPWARDS */}
                        {openDropdown === 'model' && (
                            <div className="absolute bottom-full left-0 mb-3 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_-12px_45px_rgba(0,0,0,0.18)] border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                                {/* Search input */}
                                <div className="relative mb-2">
                                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        ref={modelInputRef}
                                        type="text"
                                        value={modelSearch}
                                        onChange={(e) => setModelSearch(e.target.value)}
                                        placeholder={selectedBrand ? `Search ${selectedBrand} models...` : "Search all car models..."}
                                        className="w-full pl-9 pr-8 py-2 text-[13px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors"
                                    />
                                    {modelSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setModelSearch('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* "All Models" option */}
                                <div className="border-b border-gray-100 pb-1 mb-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedModel('');
                                            setOpenDropdown(null);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-semibold flex items-center justify-between transition-colors ${!selectedModel ? 'bg-blue-50 text-[#1877F2]' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <span>All {selectedBrand || 'Car'} Models</span>
                                        {!selectedModel && (
                                            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        )}
                                    </button>
                                </div>

                                {/* Models list */}
                                <div className="max-h-[260px] overflow-y-auto space-y-0.5 pr-1 text-sm custom-scrollbar">
                                    {filteredModels.length === 0 ? (
                                        <div className="py-6 text-center text-xs text-gray-400">
                                            No models found matching "{modelSearch}"
                                        </div>
                                    ) : (
                                        filteredModels.map((item, idx) => {
                                            const modelName = typeof item === 'string' ? item : item.model;
                                            const brandName = typeof item === 'string' ? selectedBrand : item.brand;
                                            const isSelected = selectedModel === modelName;

                                            return (
                                                <button
                                                    key={`${brandName}-${modelName}-${idx}`}
                                                    type="button"
                                                    onClick={() => handleSelectModel(modelName, brandName)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] flex items-center justify-between transition-colors ${isSelected ? 'bg-blue-50 text-[#1877F2] font-bold' : 'text-gray-700 hover:bg-gray-50 font-medium'}`}
                                                >
                                                    <span>{modelName}</span>
                                                    {!selectedBrand && (
                                                        <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                            {brandName}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ═══ 3. PRICE RANGE IN TK (OPENS UPWARDS) ═══ */}
                    <div className="relative flex-1 lg:border-r border-gray-200/80 lg:px-4">
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3.5 ${openDropdown === 'price' ? 'bg-blue-50/70 ring-2 ring-[#1877F2]/20' : 'hover:bg-gray-50/80'}`}
                        >
                            {/* Bangladeshi Taka (৳) Symbol Icon */}
                            <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0 font-extrabold text-[20px] leading-none select-none">
                                ৳
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                                    Price Range (Tk)
                                </div>
                                <div className="font-bold text-[14px] text-gray-900 truncate">
                                    {selectedPrice.label}
                                </div>
                            </div>

                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'price' ? 'rotate-180 text-[#1877F2]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Price Popover - Opens UPWARDS */}
                        {openDropdown === 'price' && (
                            <div className="absolute bottom-full left-0 mb-3 w-[310px] sm:w-[350px] bg-white rounded-2xl shadow-[0_-12px_45px_rgba(0,0,0,0.18)] border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        Budget in Taka (Tk)
                                    </span>
                                    <span className="text-[11px] font-bold text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded-full">
                                        Bangladeshi Tk
                                    </span>
                                </div>

                                <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                                    {PRICE_RANGES.map((pr) => (
                                        <button
                                            key={pr.label}
                                            type="button"
                                            onClick={() => {
                                                setSelectedPrice(pr);
                                                setOpenDropdown(null);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] flex items-center justify-between transition-colors ${selectedPrice.label === pr.label ? 'bg-blue-50 text-[#1877F2] font-bold' : 'text-gray-700 hover:bg-gray-50 font-medium'}`}
                                        >
                                            <span>{pr.label}</span>
                                            {selectedPrice.label === pr.label && (
                                                <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Tk Range Form */}
                                <div className="border-t border-gray-100 pt-3 mt-3">
                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                        Or Custom Range in Tk (৳)
                                    </div>
                                    <form onSubmit={handleApplyCustomPrice} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">৳</span>
                                                <input
                                                    type="number"
                                                    placeholder="Min Tk (e.g. 1500000)"
                                                    value={customMin}
                                                    onChange={(e) => setCustomMin(e.target.value)}
                                                    className="w-full pl-6 pr-2 py-1.5 text-[12px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1877F2] focus:bg-white"
                                                />
                                            </div>
                                            <span className="text-gray-400 text-xs">-</span>
                                            <div className="relative flex-1">
                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">৳</span>
                                                <input
                                                    type="number"
                                                    placeholder="Max Tk (e.g. 3500000)"
                                                    value={customMax}
                                                    onChange={(e) => setCustomMax(e.target.value)}
                                                    className="w-full pl-6 pr-2 py-1.5 text-[12px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1877F2] focus:bg-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-1">
                                            <div className="text-[10px] text-gray-400">
                                                {customMin || customMax ? `${formatTk(parseInt(customMin) || 0)} - ${formatTk(parseInt(customMax) || 0)}` : 'e.g. 15L - 35L Tk'}
                                            </div>
                                            <button
                                                type="submit"
                                                className="px-4 py-1.5 bg-[#1877F2] text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm"
                                            >
                                                Apply Range
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ═══ 4. CONDITION DROPDOWN (OPENS UPWARDS) ═══ */}
                    <div className="relative flex-1 lg:px-4">
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(openDropdown === 'condition' ? null : 'condition')}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3.5 ${openDropdown === 'condition' ? 'bg-blue-50/70 ring-2 ring-[#1877F2]/20' : 'hover:bg-gray-50/80'}`}
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] text-[#1877F2] flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-1">
                                    Condition
                                </div>
                                <div className="font-bold text-[14px] text-gray-900 truncate">
                                    {selectedCondition.label}
                                </div>
                            </div>

                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'condition' ? 'rotate-180 text-[#1877F2]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Condition Popover - Opens UPWARDS */}
                        {openDropdown === 'condition' && (
                            <div className="absolute bottom-full right-0 lg:left-0 mb-3 w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-[0_-12px_45px_rgba(0,0,0,0.18)] border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                                    Vehicle Condition
                                </div>
                                <div className="space-y-1">
                                    {CAR_CONDITIONS.map((cond) => (
                                        <button
                                            key={cond.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCondition(cond);
                                                setOpenDropdown(null);
                                            }}
                                            className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors ${selectedCondition.id === cond.id ? 'bg-blue-50 text-[#1877F2]' : 'hover:bg-gray-50 text-gray-700'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-[13px]">{cond.label}</span>
                                                {selectedCondition.id === cond.id && (
                                                    <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                )}
                                            </div>
                                            <div className="text-[11px] text-gray-400 mt-0.5">
                                                {cond.desc}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ═══ 5. SEARCH & RESET BUTTONS ═══ */}
                    <div className="flex items-center gap-2 pt-2 lg:pt-0 lg:pl-3">
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleReset}
                                title="Reset all filters"
                                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleSearchClick}
                            className="w-full lg:w-auto bg-[#1877F2] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 group active:scale-95 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Search Cars</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
