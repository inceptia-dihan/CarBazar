import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { CARBAZAR_SHOWROOMS, SHOWROOM_CITIES } from '@/data/showroomsData';

export default function ShowroomsCollapse({ isOpen }) {
    const [selectedCity, setSelectedCity] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredShowrooms = useMemo(() => {
        return CARBAZAR_SHOWROOMS.filter(showroom => {
            const matchesCity = selectedCity === 'All' || showroom.city.toLowerCase() === selectedCity.toLowerCase();
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || (
                showroom.name.toLowerCase().includes(q) ||
                showroom.area.toLowerCase().includes(q) ||
                showroom.address.toLowerCase().includes(q) ||
                showroom.city.toLowerCase().includes(q) ||
                showroom.services.some(s => s.toLowerCase().includes(q))
            );
            return matchesCity && matchesSearch;
        });
    }, [selectedCity, searchQuery]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            id="showrooms-collapse-section"
            className="w-full mt-12 pt-10 border-t border-blue-200/90 animate-in fade-in slide-in-from-top-4 duration-300"
        >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-[#1877F2] text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Physical Locations &amp; Inspection Points
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        Explore Our Showrooms &amp; Hubs
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        Walk in to inspect verified vehicles, book physical test drives, or receive instant trade-in appraisals.
                    </p>
                </div>

                {/* Search Box */}
                <div className="w-full md:w-80 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search area, city or showroom..."
                        className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all shadow-sm"
                    />
                    <svg
                        className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 text-xs font-bold"
                            title="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                {SHOWROOM_CITIES.map(city => {
                    const count = city === 'All'
                        ? CARBAZAR_SHOWROOMS.length
                        : CARBAZAR_SHOWROOMS.filter(s => s.city.toLowerCase() === city.toLowerCase()).length;
                    const isActive = selectedCity.toLowerCase() === city.toLowerCase();

                    return (
                        <button
                            key={city}
                            type="button"
                            onClick={() => setSelectedCity(city)}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                isActive
                                    ? 'bg-[#1877F2] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                            }`}
                        >
                            <span>{city}</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                                isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Showrooms Block Grid */}
            {filteredShowrooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredShowrooms.map(showroom => (
                        <div
                            key={showroom.id}
                            className="bg-white rounded-2xl p-6 border border-blue-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Top Badge Row */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#1877F2] text-[11px] font-extrabold border border-blue-100">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        <span>{showroom.city} • {showroom.type}</span>
                                    </span>

                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Open Today
                                    </span>
                                </div>

                                {/* Showroom Name */}
                                <h4 className="font-extrabold text-[16px] sm:text-[17px] text-gray-900 group-hover:text-[#1877F2] transition-colors mb-2 leading-snug">
                                    {showroom.name}
                                </h4>

                                {/* Address */}
                                <div className="flex items-start gap-2.5 text-[13px] text-gray-600 mb-3">
                                    <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="leading-relaxed">{showroom.address}</span>
                                </div>

                                {/* Phone & Timings */}
                                <div className="space-y-1.5 text-xs text-gray-500 mb-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                        <svg className="w-3.5 h-3.5 text-[#1877F2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${showroom.phone}`} className="hover:text-[#1877F2] transition-colors">
                                            {showroom.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{showroom.hours}</span>
                                    </div>
                                </div>

                                {/* Services tags */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {showroom.services.map((svc, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md"
                                        >
                                            <span className="text-emerald-500 font-bold">✓</span> {svc}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="pt-4 border-t border-gray-100 flex items-center gap-2.5">
                                <a
                                    href={`tel:${showroom.phone}`}
                                    className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Call Hub</span>
                                </a>

                                <Link
                                    href={`/cars?location=${encodeURIComponent(showroom.city)}`}
                                    className="flex-1 py-2 px-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1"
                                >
                                    <span>View Cars</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
                    <p className="text-gray-500 text-sm mb-3">No showroom locations matched "{searchQuery}".</p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCity('All');
                        }}
                        className="px-4 py-2 bg-[#1877F2] text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    );
}
