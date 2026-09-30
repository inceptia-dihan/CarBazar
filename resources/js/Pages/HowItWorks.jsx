import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function HowItWorks({ auth }) {
    const [activeTab, setActiveTab] = useState('buyers'); // 'buyers' | 'sellers'
    const [openFaq, setOpenFaq] = useState(0);

    const buyerSteps = [
        {
            icon: (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            stepNumber: '01',
            title: 'Browse and choose',
            desc: 'Explore hundreds of verified cars with authentic physical inspection reports, full specs, and high-resolution photos.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2 2 4-4" />
                </svg>
            ),
            stepNumber: '02',
            title: 'Inspect & test drive',
            desc: 'Schedule a physical inspection or test drive directly at our showroom or with verified sellers at your convenience.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            stepNumber: '03',
            title: 'Drive home with pride',
            desc: 'Finalize payment securely, complete hassle-free BRTA ownership transfer, and drive home your new dream car.'
        }
    ];

    const sellerSteps = [
        {
            icon: (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            ),
            stepNumber: '01',
            title: 'List your car in minutes',
            desc: 'Submit vehicle details, specs, and upload high-resolution photos with free automated Bangladesh market valuation.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            ),
            stepNumber: '02',
            title: 'Connect with verified buyers',
            desc: 'Receive direct phone calls and WhatsApp inquiries from authentic buyers with zero broker commissions or middleman spam.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            stepNumber: '03',
            title: 'Safe payment & handover',
            desc: 'Receive secure direct payment, sign official BRTA transfer paperwork effortlessly, and safely hand over your vehicle.'
        }
    ];

    const currentSteps = activeTab === 'buyers' ? buyerSteps : sellerSteps;

    const faqs = [
        {
            q: 'How does CarBazar physically inspect each vehicle?',
            a: 'Our certified automotive technicians inspect 200+ checkpoints including engine compression, transmission shifting, chassis frame integrity, suspension, AC cooling, electronic OBD diagnostics, and odometer authenticity.'
        },
        {
            q: 'Are there any hidden broker fees or commission charges?',
            a: 'No! CarBazar connects buyers and sellers directly. You negotiate and pay the agreed price directly with zero hidden middleman or broker commission markups.'
        },
        {
            q: 'Can CarBazar assist with BRTA ownership transfer paperwork?',
            a: 'Yes! We provide complete end-to-end guidance and documentation support for BRTA ownership transfer, including Form 29, Form 30, tax token clearance, and digital smart card transfer verification.'
        },
        {
            q: 'How quickly can I sell my car on CarBazar?',
            a: 'On average, competitively priced cars with authentic inspection reports receive multiple serious buyer inquiries within 48 to 72 hours of listing.'
        },
        {
            q: 'Is CarBazar service available outside of Dhaka?',
            a: 'Yes, CarBazar operates across all 64 districts of Bangladesh with certified partner inspection hubs and test drive centers in Chittagong, Sylhet, Rajshahi, Khulna, and beyond.'
        }
    ];

    return (
        <>
            <Head title="How It Works | CarBazar Bangladesh" />

            <div className="min-h-screen bg-[#F0F4F8] font-sans flex flex-col justify-between">
                <div>
                    {/* ═══ NAVBAR ══════════════════════════════════════════════════ */}
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
                                <Link href="/cars" className="hover:text-[#1877F2] transition-colors">All Cars</Link>
                                <Link
                                    href={auth?.user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                    className="hover:text-[#1877F2] transition-colors"
                                >
                                    Sell
                                </Link>
                                <Link href="/how-it-works" className="text-[#1877F2] font-bold">How it works</Link>
                                <Link href="/why-choose-us" className="hover:text-[#1877F2] transition-colors">Why choose us</Link>
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

                    {/* ═══ BREADCRUMB ═════════════════════════════════════════════ */}
                    <div className="bg-white border-b border-gray-100">
                        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-[#1877F2] font-bold">How it works</span>
                        </div>
                    </div>

                    {/* ═══ HOW IT WORKS (MATCHING HOMEPAGE DESIGN & JEEP IMAGE) ═════ */}
                    <section id="how-it-works-section" className="bg-white pt-10 pb-20 overflow-hidden">
                        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

                            {/* Section Header */}
                            <div className="flex flex-col items-center text-center mb-10">
                                <h1 className="text-[2.2rem] lg:text-[2.5rem] font-bold text-gray-900 mb-4 tracking-tight">How it works</h1>
                                <p className="text-gray-800 font-bold text-[14px] leading-relaxed max-w-2xl">
                                    Buying or selling a car has never been easier. Our streamlined marketplace makes it simple<br className="hidden md:block" /> for you to inspect, test-drive, and purchase verified vehicles online
                                </p>

                                {/* Perspective Switcher */}
                                <div className="mt-8 inline-flex p-1 bg-gray-100/90 rounded-2xl border border-gray-200/70 shadow-inner">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('buyers')}
                                        className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                            activeTab === 'buyers'
                                                ? 'bg-[#1877F2] text-white shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <span>For Car Buyers</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('sellers')}
                                        className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                            activeTab === 'sellers'
                                                ? 'bg-[#1877F2] text-white shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span>For Car Sellers</span>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Jeep Wrangler Image Display */}
                            <div className="block lg:hidden w-full h-56 sm:h-72 rounded-3xl overflow-hidden mb-8 shadow-md">
                                <img
                                    src="/images/jeep-car.jpg"
                                    alt="Jeep Wrangler"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative flex flex-col lg:flex-row items-center">

                                {/* Jeep Image replacing blue bg div (Desktop: exactly matching homepage) */}
                                <div className="hidden lg:block absolute -right-8 top-[-20px] bottom-[-20px] w-[65%] rounded-3xl z-0 overflow-hidden shadow-sm">
                                    <img
                                        src="/images/jeep-car.jpg"
                                        alt="Jeep Wrangler"
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                </div>

                                {/* Left: Cards */}
                                <div className="lg:w-[45%] z-10 w-full space-y-4 pt-4 lg:pt-0 lg:-ml-6">
                                    {currentSteps.map((step, i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 lg:p-7 flex gap-5 relative z-10 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)]"
                                        >
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

                                    {/* Action Buttons */}
                                    <div className="pt-3 flex flex-wrap items-center gap-3">
                                        {activeTab === 'buyers' ? (
                                            <>
                                                <Link
                                                    href="/cars"
                                                    className="bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-[13px] transition-all duration-200 shadow-md flex items-center gap-2 group cursor-pointer"
                                                >
                                                    <span>Browse Verified Cars</span>
                                                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                                                </Link>
                                                <Link
                                                    href="/#why-choose-us-section"
                                                    className="border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 px-5 py-3 rounded-xl font-bold text-[13px] transition-colors cursor-pointer"
                                                >
                                                    Showroom Hubs
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={auth?.user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                                    className="bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-[13px] transition-all duration-200 shadow-md flex items-center gap-2 group cursor-pointer"
                                                >
                                                    <span>Sell Your Car Free</span>
                                                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                                                </Link>
                                                <Link
                                                    href="/cars"
                                                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-3 rounded-xl font-bold text-[13px] transition-colors cursor-pointer"
                                                >
                                                    Check Market Prices
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══ TRUST PILLARS & GUARANTEES ═════════════════════════════ */}
                    <section className="bg-slate-50 py-16 border-y border-gray-200/80">
                        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
                            <div className="text-center mb-12">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">Why CarBazar Works</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-3">
                                    Peace of Mind with Every Vehicle
                                </h2>
                                <p className="text-gray-600 text-sm max-w-xl mx-auto">
                                    Every car listed on CarBazar goes through rigorous authentic checks to ensure you get complete transparency.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        title: '200+ Point Inspection',
                                        desc: 'Engine compression, transmission, suspension, chassis frame, and electronics certified by our technicians.',
                                        icon: (
                                            <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: 'Direct Buyer-Seller Deals',
                                        desc: 'Negotiate and complete purchases directly with genuine owners with zero secret middleman broker commissions.',
                                        icon: (
                                            <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: '100% BRTA Legal Transfer',
                                        desc: 'Complete documentation guidance for Form 29, Form 30, tax tokens, and vehicle ownership transfer verification.',
                                        icon: (
                                            <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: 'Nationwide Showrooms',
                                        desc: 'Inspection hubs and partner showrooms available across Dhaka, Chittagong, Sylhet, and all 64 districts.',
                                        icon: (
                                            <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        )
                                    }
                                ].map((pillar, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl p-6 border border-gray-200/70 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-base mb-2">{pillar.title}</h3>
                                        <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">{pillar.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ═══ FREQUENTLY ASKED QUESTIONS (FAQ) ════════════════════════ */}
                    <section className="max-w-[900px] mx-auto px-6 lg:px-8 py-16">
                        <div className="text-center mb-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">Got Questions?</span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-2">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Find answers to common questions about purchasing, inspecting, and selling vehicles on CarBazar.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-6 py-4 text-left font-bold text-sm text-gray-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <span>{faq.q}</span>
                                            <span className={`text-base font-bold text-[#1877F2] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                                ↓
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ═══ BOTTOM CTA BANNER ═══════════════════════════════════════ */}
                    <section className="max-w-[1100px] mx-auto px-6 lg:px-10 pb-20">
                        <div className="bg-gradient-to-r from-[#0B1E34] to-[#1877F2] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
                                    Ready to Experience a Smarter Way to Buy or Sell?
                                </h2>
                                <p className="text-blue-100 text-xs sm:text-sm mb-8 leading-relaxed">
                                    Join thousands of car owners across Bangladesh. Find your dream car or list your vehicle with verified buyers in minutes.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <Link
                                        href="/cars"
                                        className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                                    >
                                        Explore Cars Collection
                                    </Link>
                                    <Link
                                        href={auth?.user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                        className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all border border-blue-300/40 shadow-md cursor-pointer"
                                    >
                                        Sell Your Car Free
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* ═══ FOOTER ══════════════════════════════════════════════════ */}
                <Footer user={auth?.user} />
            </div>
        </>
    );
}
