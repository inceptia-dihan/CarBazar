import React, { useState, useMemo } from 'react';
import { CAR_BRANDS, PRICE_RANGES, CAR_CONDITIONS } from '@/data/carBrandsModels';

const BODY_TYPES = [
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
    setSearchKeyword = () => { },
}) {
    const [brandSearch, setBrandSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');
    const [customMin, setCustomMin] = useState(minPrice ? String(minPrice) : '');
    const [customMax, setCustomMax] = useState(maxPrice ? String(maxPrice) : '');
    const [openSection, setOpenSection] = useState(null); // only one section open at a time

    const activeFiltersCount = [
        selectedBrand,
        selectedModel,
        selectedBodyType,
        selectedCondition && selectedCondition !== 'all' ? selectedCondition : '',
        minPrice !== null || maxPrice !== null ? 'price' : '',
    ].filter(Boolean).length;

    // Brand list — only show when there's a search query
    const brandResults = useMemo(() => {
        const q = brandSearch.toLowerCase().trim();
        if (!q) return [];
        return CAR_BRANDS.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 8);
    }, [brandSearch]);

    // Model list — based on selected brand or search
    const modelResults = useMemo(() => {
        const q = modelSearch.toLowerCase().trim();
        if (selectedBrand) {
            const brandObj = CAR_BRANDS.find((b) => b.name.toLowerCase() === selectedBrand.toLowerCase());
            const models = brandObj ? brandObj.models : [];
            if (!q) return models.slice(0, 8);
            return models.filter((m) => m.toLowerCase().includes(q)).slice(0, 8);
        }
        if (!q) return [];
        return CAR_BRANDS.flatMap((b) =>
            b.models
                .filter((m) => m.toLowerCase().includes(q) || b.name.toLowerCase().includes(q))
                .slice(0, 2)
                .map((m) => ({ model: m, brand: b.name }))
        ).slice(0, 8);
    }, [modelSearch, selectedBrand]);

    const handleSelectBrand = (brandName) => {
        if (selectedBrand.toLowerCase() === brandName.toLowerCase()) {
            setSelectedBrand('');
            setSelectedModel('');
        } else {
            setSelectedBrand(brandName);
            setSelectedModel('');
        }
        setBrandSearch('');
    };

    const handleSelectModel = (modelName, brandOfModel = null) => {
        if (selectedModel.toLowerCase() === modelName.toLowerCase()) {
            setSelectedModel('');
        } else {
            setSelectedModel(modelName);
            if (brandOfModel && !selectedBrand) setSelectedBrand(brandOfModel);
        }
        setModelSearch('');
    };

    const handleApplyCustomPrice = (e) => {
        e.preventDefault();
        setMinPrice(customMin ? parseInt(customMin, 10) : null);
        setMaxPrice(customMax ? parseInt(customMax, 10) : null);
    };

    const currentPriceSummary = useMemo(() => {
        if (minPrice !== null || maxPrice !== null) {
            const preset = PRICE_RANGES.find((r) => r.min === minPrice && r.max === maxPrice);
            if (preset) return preset.label;
            if (minPrice && maxPrice) return `${(minPrice / 100000).toFixed(0)}L – ${(maxPrice / 100000).toFixed(0)}L`;
            if (minPrice) return `> ${(minPrice / 100000).toFixed(0)}L`;
            if (maxPrice) return `< ${(maxPrice / 100000).toFixed(0)}L`;
        }
        return null;
    }, [minPrice, maxPrice]);

    const currentConditionObj = CAR_CONDITIONS.find((c) => c.id === (selectedCondition || 'all'));

    const toggle = (key) => setOpenSection((prev) => (prev === key ? null : key));

    const SectionHeader = ({ sectionKey, label, value, onReset }) => (
        <button
            type="button"
            onClick={() => toggle(sectionKey)}
            className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
        >
            <div className="text-left min-w-0">
                <div className="text-[12px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{label}</div>
                {value && <div className="text-[10px] text-blue-600 font-medium truncate">{value}</div>}
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {value && onReset && (
                    <span
                        onClick={(e) => { e.stopPropagation(); onReset(); }}
                        className="text-[9px] text-gray-400 hover:text-red-500 cursor-pointer transition-colors px-1"
                    >✕</span>
                )}
                <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${openSection === sectionKey ? 'rotate-0' : '-rotate-90'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </button>
    );

    return (
        <div className="w-full h-full flex flex-col bg-white select-none text-[12px]">

            {/* ── HEADER ── */}
            <div className="px-3 pt-4 pb-3 border-b border-gray-100 shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[13px] font-bold text-gray-900">Filters</span>
                                {activeFiltersCount > 0 && (
                                    <span className="bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">{activeFiltersCount}</span>
                                )}
                            </div>
                            <div className="text-[10px] text-gray-400">{filteredCount} cars</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {activeFiltersCount > 0 && (
                            <button
                                type="button"
                                onClick={() => { onResetAll(); setCustomMin(''); setCustomMax(''); setBrandSearch(''); setModelSearch(''); }}
                                className="text-[10px] font-semibold text-red-500 hover:text-red-600 cursor-pointer"
                            >
                                Clear all
                            </button>
                        )}
                        {onCloseMobile && (
                            <button type="button" onClick={onCloseMobile} className="lg:hidden w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center cursor-pointer text-xs">✕</button>
                        )}
                    </div>
                </div>

                {/* Global search */}
                <div className="relative">
                    <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search cars..."
                        className="w-full text-[12px] bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-7 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    />
                    {searchKeyword && (
                        <button type="button" onClick={() => setSearchKeyword('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>
            </div>

            {/* ── SECTIONS ── */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-2 space-y-0.5">

                {/* ── 1. BRAND ── */}
                <div>
                    <SectionHeader
                        sectionKey="brand"
                        label="Brand / Make"
                        value={selectedBrand || null}
                        onReset={() => { setSelectedBrand(''); setSelectedModel(''); }}
                    />
                    {openSection === 'brand' && (
                        <div className="px-3 pb-2">
                            <div className="relative mb-2">
                                <svg className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={brandSearch}
                                    onChange={(e) => setBrandSearch(e.target.value)}
                                    placeholder="Type to search brand..."
                                    className="w-full text-[11px] bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-6 py-1.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                />
                                {brandSearch && (
                                    <button type="button" onClick={() => setBrandSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>

                            {selectedBrand && (
                                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5 mb-1.5">
                                    <span className="text-[11px] font-semibold text-blue-700">{selectedBrand}</span>
                                    <button type="button" onClick={() => { setSelectedBrand(''); setSelectedModel(''); }} className="text-blue-400 hover:text-red-500 cursor-pointer ml-2">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}

                            {brandSearch ? (
                                brandResults.length > 0 ? (
                                    <div className="space-y-0.5">
                                        {brandResults.map((b) => {
                                            const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
                                            return (
                                                <button
                                                    key={b.name}
                                                    type="button"
                                                    onClick={() => handleSelectBrand(b.name)}
                                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                                                >
                                                    <span>{b.name}</span>
                                                    <span className={`text-[9px] px-1 py-0.5 rounded ${isSelected ? 'bg-blue-500 text-blue-100' : 'bg-gray-100 text-gray-400'}`}>{b.models.length}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-gray-400 text-center py-2">No brands found</p>
                                )
                            ) : !selectedBrand ? (
                                <p className="text-[10px] text-gray-400 text-center py-2">Type to search a brand</p>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── 2. MODEL ── */}
                <div>
                    <SectionHeader
                        sectionKey="model"
                        label="Model"
                        value={selectedModel || (selectedBrand ? `${selectedBrand} models` : null)}
                        onReset={selectedModel ? () => setSelectedModel('') : null}
                    />
                    {openSection === 'model' && (
                        <div className="px-3 pb-2">
                            <div className="relative mb-2">
                                <svg className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={modelSearch}
                                    onChange={(e) => setModelSearch(e.target.value)}
                                    placeholder={selectedBrand ? `Search ${selectedBrand}...` : 'Type to search model...'}
                                    className="w-full text-[11px] bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-6 py-1.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                />
                                {modelSearch && (
                                    <button type="button" onClick={() => setModelSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>

                            {selectedModel && (
                                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5 mb-1.5">
                                    <span className="text-[11px] font-semibold text-blue-700">{selectedModel}</span>
                                    <button type="button" onClick={() => setSelectedModel('')} className="text-blue-400 hover:text-red-500 cursor-pointer ml-2">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            )}

                            {modelResults.length > 0 ? (
                                <div className="space-y-0.5">
                                    {selectedBrand ? (
                                        modelResults.map((m) => {
                                            const isSel = selectedModel.toLowerCase() === m.toLowerCase();
                                            return (
                                                <button key={m} type="button" onClick={() => handleSelectModel(m)}
                                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${isSel ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                                                >{m}</button>
                                            );
                                        })
                                    ) : (
                                        modelResults.map((item, idx) => {
                                            const isSel = selectedModel.toLowerCase() === item.model.toLowerCase();
                                            return (
                                                <button key={`${item.brand}-${item.model}-${idx}`} type="button" onClick={() => handleSelectModel(item.model, item.brand)}
                                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${isSel ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                                                >
                                                    <span>{item.model}</span>
                                                    <span className={`text-[9px] ${isSel ? 'text-blue-200' : 'text-gray-400'}`}>{item.brand}</span>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            ) : !selectedModel ? (
                                <p className="text-[10px] text-gray-400 text-center py-2">
                                    {selectedBrand ? `Showing ${selectedBrand} models above` : 'Type to search a model'}
                                </p>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── 3. PRICE ── */}
                <div>
                    <SectionHeader
                        sectionKey="price"
                        label="Price Range (BDT)"
                        value={currentPriceSummary}
                        onReset={() => { setMinPrice(null); setMaxPrice(null); setCustomMin(''); setCustomMax(''); }}
                    />
                    {openSection === 'price' && (
                        <div className="px-3 pb-2 space-y-2">
                            {/* Quick presets — compact 2-col */}
                            <div className="grid grid-cols-2 gap-1">
                                {PRICE_RANGES.map((r) => {
                                    const active = minPrice === r.min && maxPrice === r.max;
                                    return (
                                        <button key={r.label} type="button"
                                            onClick={() => { setMinPrice(r.min); setMaxPrice(r.max); setCustomMin(r.min ? String(r.min) : ''); setCustomMax(r.max ? String(r.max) : ''); }}
                                            className={`px-1.5 py-1.5 rounded-lg text-[10px] font-semibold border text-center cursor-pointer transition-all leading-tight ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}
                                        >
                                            {r.label}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Custom */}
                            <form onSubmit={handleApplyCustomPrice} className="bg-gray-50 rounded-lg border border-gray-200 p-2 space-y-1.5">
                                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Custom (৳)</div>
                                <div className="grid grid-cols-2 gap-1.5">
                                    <input type="number" value={customMin} onChange={(e) => setCustomMin(e.target.value)} placeholder="Min"
                                        className="w-full text-[11px] bg-white border border-gray-200 rounded-md px-2 py-1.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
                                    <input type="number" value={customMax} onChange={(e) => setCustomMax(e.target.value)} placeholder="Max"
                                        className="w-full text-[11px] bg-white border border-gray-200 rounded-md px-2 py-1.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400" />
                                </div>
                                <button type="submit" className="w-full py-1.5 bg-gray-800 hover:bg-blue-600 text-white text-[10px] font-semibold rounded-md transition-colors cursor-pointer">Apply</button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── 4. CONDITION ── */}
                <div>
                    <SectionHeader
                        sectionKey="condition"
                        label="Condition"
                        value={selectedCondition && selectedCondition !== 'all' ? currentConditionObj?.label : null}
                        onReset={() => setSelectedCondition('all')}
                    />
                    {openSection === 'condition' && (
                        <div className="px-3 pb-2 space-y-1">
                            {CAR_CONDITIONS.map((c) => {
                                const isSel = (selectedCondition || 'all') === c.id;
                                return (
                                    <button key={c.id} type="button" onClick={() => setSelectedCondition(c.id)}
                                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border cursor-pointer transition-all ${isSel ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ${isSel ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                            {isSel && <div className="w-1 h-1 rounded-full bg-white" />}
                                        </div>
                                        <span className="flex-1 text-left">{c.label}</span>
                                        {c.id === 'new' && <span className="text-[8px] font-bold bg-green-100 text-green-700 px-1 py-0.5 rounded">0km</span>}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── 5. BODY TYPE ── */}
                <div>
                    <SectionHeader
                        sectionKey="bodyType"
                        label="Body Type"
                        value={selectedBodyType || null}
                        onReset={() => setSelectedBodyType('')}
                    />
                    {openSection === 'bodyType' && (
                        <div className="px-3 pb-2">
                            <div className="flex flex-wrap gap-1.5">
                                {BODY_TYPES.map((t) => {
                                    const isSel = selectedBodyType === t.id;
                                    return (
                                        <button key={t.id} type="button"
                                            onClick={() => setSelectedBodyType(isSel ? '' : t.id)}
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border cursor-pointer transition-all ${isSel ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}
                                        >
                                            {t.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* ── MOBILE FOOTER ── */}
            {onCloseMobile && (
                <div className="p-3 border-t border-gray-100 shrink-0 lg:hidden">
                    <button type="button" onClick={onCloseMobile}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[12px] font-semibold transition-colors cursor-pointer">
                        View {filteredCount} {filteredCount === 1 ? 'Car' : 'Cars'}
                    </button>
                </div>
            )}
        </div>
    );
}
