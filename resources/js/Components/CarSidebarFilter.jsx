import React, { useState, useMemo } from 'react';
import { CAR_BRANDS, PRICE_RANGES, CAR_CONDITIONS } from '@/data/carBrandsModels';

const BODY_TYPES = [
    { id: '', label: 'All Types' },
    { id: 'Sedan', label: 'Sedan' },
    { id: 'SUV', label: 'SUV' },
    { id: 'Crossover', label: 'Crossover' },
    { id: 'Coupe', label: 'Coupe' },
    { id: 'Compact', label: 'Compact' },
    { id: 'Wagon', label: 'Wagon' },
    { id: 'Convertible', label: 'Convertible' },
];

export default function CarSidebarFilter({
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    selectedBodyType,
    setSelectedBodyType,
    selectedCondition,
    setSelectedCondition,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onResetAll,
    filteredCount = 0,
    totalCount = 0,
    onCloseMobile,
    searchKeyword = '',
    setSearchKeyword = () => {},
}) {
    const [brandSearch, setBrandSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');
    const [customMin, setCustomMin] = useState(minPrice ? String(minPrice) : '');
    const [customMax, setCustomMax] = useState(maxPrice ? String(maxPrice) : '');
    const [showAllBrands, setShowAllBrands] = useState(false);

    // Collapsible accordion state for each filter section
    const [collapsed, setCollapsed] = useState({
        brand: false,
        model: false,
        price: false,
        condition: false,
        bodyType: false,
    });

    const toggleSection = (key) => {
        setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const allCollapsed = Object.values(collapsed).every(Boolean);
    const toggleAllSections = () => {
        const nextState = !allCollapsed;
        setCollapsed({
            brand: nextState,
            model: nextState,
            price: nextState,
            condition: nextState,
            bodyType: nextState,
        });
    };

    // Active filters count
    const activeFiltersCount = [
        selectedBrand,
        selectedModel,
        selectedBodyType,
        selectedCondition && selectedCondition !== 'all' ? selectedCondition : '',
        minPrice !== null || maxPrice !== null ? 'price' : '',
    ].filter(Boolean).length;

    // Filtered brand list
    const filteredBrands = useMemo(() => {
        if (!brandSearch.trim()) return CAR_BRANDS;
        const q = brandSearch.toLowerCase().trim();
        return CAR_BRANDS.filter((b) => b.name.toLowerCase().includes(q));
    }, [brandSearch]);

    const displayedBrands = useMemo(() => {
        if (showAllBrands || brandSearch.trim()) return filteredBrands;
        return filteredBrands.slice(0, 8);
    }, [filteredBrands, showAllBrands, brandSearch]);

    // Available models based on selected brand
    const availableModels = useMemo(() => {
        if (selectedBrand) {
            const brandObj = CAR_BRANDS.find(
                (b) => b.name.toLowerCase() === selectedBrand.toLowerCase()
            );
            return brandObj ? brandObj.models : [];
        }
        return CAR_BRANDS.filter((b) => b.popular).flatMap((b) =>
            b.models.slice(0, 3).map((m) => ({ model: m, brand: b.name }))
        );
    }, [selectedBrand]);

    // Filtered models
    const filteredModels = useMemo(() => {
        const q = modelSearch.toLowerCase().trim();
        if (selectedBrand) {
            if (!q) return availableModels;
            return availableModels.filter((m) => m.toLowerCase().includes(q));
        } else {
            if (!q) return availableModels.slice(0, 10);
            return availableModels.filter(
                (item) =>
                    item.model.toLowerCase().includes(q) ||
                    item.brand.toLowerCase().includes(q)
            );
        }
    }, [availableModels, modelSearch, selectedBrand]);

    const handleSelectBrand = (brandName) => {
        if (selectedBrand.toLowerCase() === brandName.toLowerCase()) {
            setSelectedBrand('');
            setSelectedModel('');
        } else {
            setSelectedBrand(brandName);
            setSelectedModel('');
            // Auto open model section if collapsed
            setCollapsed((prev) => ({ ...prev, model: false }));
        }
        setModelSearch('');
    };

    const handleSelectModel = (modelName, brandOfModel = null) => {
        if (selectedModel.toLowerCase() === modelName.toLowerCase()) {
            setSelectedModel('');
        } else {
            setSelectedModel(modelName);
            if (brandOfModel && !selectedBrand) {
                setSelectedBrand(brandOfModel);
            }
        }
    };

    const handleApplyCustomPrice = (e) => {
        e.preventDefault();
        const minVal = customMin ? parseInt(customMin, 10) : null;
        const maxVal = customMax ? parseInt(customMax, 10) : null;
        setMinPrice(minVal);
        setMaxPrice(maxVal);
    };

    const handleSelectPriceRange = (range) => {
        setMinPrice(range.min);
        setMaxPrice(range.max);
        setCustomMin(range.min !== null ? String(range.min) : '');
        setCustomMax(range.max !== null ? String(range.max) : '');
    };

    const isCurrentPriceRange = (range) => {
        return minPrice === range.min && maxPrice === range.max;
    };

    // Formatted current price summary
    const currentPriceSummary = useMemo(() => {
        if (minPrice !== null || maxPrice !== null) {
            const matchedPreset = PRICE_RANGES.find(
                (r) => r.min === minPrice && r.max === maxPrice
            );
            if (matchedPreset) return matchedPreset.label;
            if (minPrice && maxPrice) return `৳ ${(minPrice / 100000).toFixed(0)}L - ${(maxPrice / 100000).toFixed(0)}L`;
            if (minPrice) return `> ৳ ${(minPrice / 100000).toFixed(0)} Lakh`;
            if (maxPrice) return `< ৳ ${(maxPrice / 100000).toFixed(0)} Lakh`;
        }
        return 'All Prices';
    }, [minPrice, maxPrice]);

    // Current condition summary
    const currentConditionObj = CAR_CONDITIONS.find((c) => c.id === (selectedCondition || 'all'));

    return (
        <div className="w-full h-full flex flex-col bg-white select-none">
            {/* ═══ SIDEBAR TOP HEADER ═══ */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/80 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-extrabold text-[15px] text-gray-900 leading-tight">Filter Cars</h2>
                            {activeFiltersCount > 0 && (
                                <span className="bg-[#1877F2] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium">
                            {filteredCount} {filteredCount === 1 ? 'vehicle' : 'vehicles'} found
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleAllSections}
                        className="text-[11px] font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-gray-200/60"
                        title={allCollapsed ? "Expand all sections" : "Collapse all sections"}
                    >
                        {allCollapsed ? "Expand" : "Collapse"}
                    </button>

                    {activeFiltersCount > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                onResetAll();
                                setCustomMin('');
                                setCustomMax('');
                                setBrandSearch('');
                                setModelSearch('');
                            }}
                            className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-0.5 cursor-pointer transition-colors"
                        >
                            <span>Clear</span>
                        </button>
                    )}

                    {onCloseMobile && (
                        <button
                            type="button"
                            onClick={onCloseMobile}
                            className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* ═══ GLOBAL CAR KEYWORD SEARCH (At top of sidebar) ═══ */}
            <div className="p-3.5 border-b border-gray-100 bg-gray-50/70 shrink-0">
                <div className="relative">
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search any car name or model..."
                        className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 pl-8 pr-7 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-all shadow-sm"
                    />
                    <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchKeyword && (
                        <button
                            type="button"
                            onClick={() => setSearchKeyword('')}
                            className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* ═══ SCROLLABLE ACCORDION FILTER SECTIONS ═══ */}
            <div className="p-5 space-y-5 overflow-y-auto flex-1 custom-scrollbar divide-y divide-gray-100">

                {/* ═══ 1. BRAND / MAKE (COLLAPSIBLE) ═══ */}
                <div>
                    <div
                        onClick={() => toggleSection('brand')}
                        className="flex items-center justify-between cursor-pointer py-1 select-none group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                Brand / Make
                            </span>
                            {selectedBrand && (
                                <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    {selectedBrand}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {selectedBrand && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                         e.stopPropagation();
                                         setSelectedBrand('');
                                         setSelectedModel('');
                                    }}
                                    className="text-[11px] text-gray-400 hover:text-red-500 font-semibold"
                                >
                                    Reset
                                </button>
                            )}
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-gray-400 group-hover:text-gray-700 transition-colors">
                                <svg
                                    className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                                        collapsed.brand ? '-rotate-90 text-gray-400' : 'rotate-0 text-[#1877F2]'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {!collapsed.brand && (
                        <div className="mt-2.5 animate-fadeIn">
                            {/* Brand Search Input with Collapse Button beside it */}
                            <div className="flex items-center gap-1.5 mb-2.5">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={brandSearch}
                                        onChange={(e) => setBrandSearch(e.target.value)}
                                        placeholder="Search brand (e.g. Toyota)..."
                                        className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 pl-8 pr-7 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
                                    />
                                    <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {brandSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setBrandSearch('')}
                                            className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleSection('brand')}
                                    title="Collapse Brand Section"
                                    className="h-8 px-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                >
                                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Brand List */}
                            <div className="max-h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBrand('');
                                        setSelectedModel('');
                                    }}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                        !selectedBrand
                                            ? 'bg-[#1877F2] text-white shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span>All Brands</span>
                                    {!selectedBrand && <span className="text-[10px]">✓</span>}
                                </button>

                                {displayedBrands.map((b) => {
                                    const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
                                    return (
                                        <button
                                            key={b.name}
                                            type="button"
                                            onClick={() => handleSelectBrand(b.name)}
                                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                                isSelected
                                                    ? 'bg-[#1877F2] text-white shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span>{b.name}</span>
                                            {isSelected ? (
                                                <span className="text-[10px]">✓</span>
                                            ) : (
                                                <span className="text-[10px] text-gray-400">{b.models.length}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {!brandSearch && filteredBrands.length > 8 && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllBrands(!showAllBrands)}
                                    className="mt-2 text-[11px] font-bold text-[#1877F2] hover:text-blue-700 transition-colors cursor-pointer"
                                >
                                    {showAllBrands ? 'Show Less' : `+ ${filteredBrands.length - 8} More Brands`}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* ═══ 2. MODEL (COLLAPSIBLE) ═══ */}
                <div className="pt-4">
                    <div
                        onClick={() => toggleSection('model')}
                        className="flex items-center justify-between cursor-pointer py-1 select-none group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                Model
                            </span>
                            {selectedModel ? (
                                <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-extrabold px-2 py-0.5 rounded-full truncate max-w-[110px]">
                                    {selectedModel}
                                </span>
                            ) : selectedBrand ? (
                                <span className="text-[11px] font-medium text-gray-400">
                                    ({selectedBrand})
                                </span>
                            ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                            {selectedModel && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedModel('');
                                    }}
                                    className="text-[11px] text-gray-400 hover:text-red-500 font-semibold"
                                >
                                    Reset
                                </button>
                            )}
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-gray-400 group-hover:text-gray-700 transition-colors">
                                <svg
                                    className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                                        collapsed.model ? '-rotate-90 text-gray-400' : 'rotate-0 text-[#1877F2]'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {!collapsed.model && (
                        <div className="mt-2.5 animate-fadeIn">
                            {/* Model Search Input with Collapse Button beside it */}
                            <div className="flex items-center gap-1.5 mb-2.5">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={modelSearch}
                                        onChange={(e) => setModelSearch(e.target.value)}
                                        placeholder={selectedBrand ? `Search ${selectedBrand} models...` : "Search all models..."}
                                        className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 pl-8 pr-7 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
                                    />
                                    <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {modelSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setModelSearch('')}
                                            className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleSection('model')}
                                    title="Collapse Model Section"
                                    className="h-8 px-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                >
                                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Model List */}
                            <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                <button
                                    type="button"
                                    onClick={() => setSelectedModel('')}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                        !selectedModel
                                            ? 'bg-[#1877F2] text-white shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span>All Models</span>
                                    {!selectedModel && <span className="text-[10px]">✓</span>}
                                </button>

                                {selectedBrand ? (
                                    filteredModels.map((m) => {
                                        const isSelected = selectedModel.toLowerCase() === m.toLowerCase();
                                        return (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => handleSelectModel(m)}
                                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#1877F2] text-white shadow-sm'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span>{m}</span>
                                                {isSelected && <span className="text-[10px]">✓</span>}
                                            </button>
                                        );
                                    })
                                ) : (
                                    filteredModels.map((item, idx) => {
                                        const isSelected = selectedModel.toLowerCase() === item.model.toLowerCase();
                                        return (
                                            <button
                                                key={`${item.brand}-${item.model}-${idx}`}
                                                type="button"
                                                onClick={() => handleSelectModel(item.model, item.brand)}
                                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#1877F2] text-white shadow-sm'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span>{item.model}</span>
                                                <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                                    {item.brand}
                                                </span>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ═══ 3. PRICE RANGE (COLLAPSIBLE) ═══ */}
                <div className="pt-4">
                    <div
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between cursor-pointer py-1 select-none group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                Price Range (BDT)
                            </span>
                            {(minPrice !== null || maxPrice !== null) && (
                                <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    Active
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {(minPrice !== null || maxPrice !== null) && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMinPrice(null);
                                        setMaxPrice(null);
                                        setCustomMin('');
                                        setCustomMax('');
                                    }}
                                    className="text-[11px] text-gray-400 hover:text-red-500 font-semibold"
                                >
                                    Reset
                                </button>
                            )}
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-gray-400 group-hover:text-gray-700 transition-colors">
                                <svg
                                    className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                                        collapsed.price ? '-rotate-90 text-gray-400' : 'rotate-0 text-[#1877F2]'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {collapsed.price && (minPrice !== null || maxPrice !== null) && (
                        <div className="text-[11px] font-medium text-gray-500 mt-1 pl-0.5">
                            {currentPriceSummary}
                        </div>
                    )}

                    {!collapsed.price && (
                        <div className="mt-2.5 animate-fadeIn space-y-3">
                            {/* Quick Presets */}
                            <div className="space-y-1">
                                {PRICE_RANGES.map((range) => {
                                    const active = isCurrentPriceRange(range);
                                    return (
                                        <button
                                            key={range.label}
                                            type="button"
                                            onClick={() => handleSelectPriceRange(range)}
                                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                                                active
                                                    ? 'bg-[#1877F2] text-white font-bold shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span>{range.label}</span>
                                            {active && <span className="text-[10px]">✓</span>}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Custom Min / Max Inputs */}
                            <form onSubmit={handleApplyCustomPrice} className="bg-gray-50 p-2.5 rounded-xl border border-gray-200/80">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                    Custom Range (Tk)
                                </span>
                                <div className="grid grid-cols-2 gap-1.5 mb-2">
                                    <input
                                        type="number"
                                        value={customMin}
                                        onChange={(e) => setCustomMin(e.target.value)}
                                        placeholder="Min Tk"
                                        className="w-full text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-[#1877F2]"
                                    />
                                    <input
                                        type="number"
                                        value={customMax}
                                        onChange={(e) => setCustomMax(e.target.value)}
                                        placeholder="Max Tk"
                                        className="w-full text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:border-[#1877F2]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-1.5 bg-[#1877F2] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                >
                                    Apply Price
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* ═══ 4. CONDITION (COLLAPSIBLE) ═══ */}
                <div className="pt-4">
                    <div
                        onClick={() => toggleSection('condition')}
                        className="flex items-center justify-between cursor-pointer py-1 select-none group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                Condition
                            </span>
                            {selectedCondition && selectedCondition !== 'all' && (
                                <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    {currentConditionObj?.label || selectedCondition}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {selectedCondition && selectedCondition !== 'all' && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCondition('all');
                                    }}
                                    className="text-[11px] text-gray-400 hover:text-red-500 font-semibold"
                                >
                                    Reset
                                </button>
                            )}
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-gray-400 group-hover:text-gray-700 transition-colors">
                                <svg
                                    className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                                        collapsed.condition ? '-rotate-90 text-gray-400' : 'rotate-0 text-[#1877F2]'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {!collapsed.condition && (
                        <div className="mt-2.5 animate-fadeIn space-y-1.5">
                            {CAR_CONDITIONS.map((c) => {
                                const isSelected = (selectedCondition || 'all') === c.id;
                                return (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => setSelectedCondition(c.id)}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                                            isSelected
                                                ? 'bg-blue-50/70 border-[#1877F2] text-[#1877F2] font-bold'
                                                : 'bg-white border-gray-200/80 text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                                    isSelected ? 'border-[#1877F2] bg-[#1877F2]' : 'border-gray-300 bg-white'
                                                }`}
                                            >
                                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                            </div>
                                            <span>{c.label}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400">
                                            {c.id === 'all' ? 'All' : c.id === 'new' ? '0km' : ''}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* ═══ 5. BODY TYPE (COLLAPSIBLE) ═══ */}
                <div className="pt-4">
                    <div
                        onClick={() => toggleSection('bodyType')}
                        className="flex items-center justify-between cursor-pointer py-1 select-none group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                                Body Type
                            </span>
                            {selectedBodyType && (
                                <span className="bg-[#1877F2]/10 text-[#1877F2] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    {selectedBodyType}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {selectedBodyType && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedBodyType('');
                                    }}
                                    className="text-[11px] text-gray-400 hover:text-red-500 font-semibold"
                                >
                                    Reset
                                </button>
                            )}
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-gray-400 group-hover:text-gray-700 transition-colors">
                                <svg
                                    className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                                        collapsed.bodyType ? '-rotate-90 text-gray-400' : 'rotate-0 text-[#1877F2]'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {!collapsed.bodyType && (
                        <div className="mt-2.5 animate-fadeIn flex flex-wrap gap-1.5">
                            {BODY_TYPES.map((type) => {
                                const isSelected = (selectedBodyType || '') === type.id;
                                return (
                                    <button
                                        key={type.label}
                                        type="button"
                                        onClick={() => setSelectedBodyType(isSelected ? '' : type.id)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                                            isSelected
                                                ? 'bg-[#1877F2] text-white border-[#1877F2] shadow-sm'
                                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>

            {/* ═══ MOBILE DRAWER FOOTER ═══ */}
            {onCloseMobile && (
                <div className="p-4 border-t border-gray-100 bg-slate-50 lg:hidden shrink-0">
                    <button
                        type="button"
                        onClick={onCloseMobile}
                        className="w-full py-2.5 bg-[#1877F2] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                        View {filteredCount} {filteredCount === 1 ? 'Car' : 'Cars'}
                    </button>
                </div>
            )}
        </div>
    );
}
