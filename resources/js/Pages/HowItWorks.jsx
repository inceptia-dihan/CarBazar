import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function HowItWorks({ auth }) {
    const [activeWorkflow, setActiveWorkflow] = useState('buyers'); // 'buyers' | 'sellers'
    const [openFaq, setOpenFaq] = useState(0);

    const buyerSteps = [
        {
            step: '01',
            title: 'Browse & Filter Verified Vehicles',
            subtitle: 'Find genuine cars with authentic data',
            desc: 'Search through thousands of verified pre-owned and brand-new cars. Filter by brand, budget, model, body type, and condition. Every listing includes authentic high-res photos and detailed inspection reports.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            tag: 'Step 1'
        },
        {
            step: '02',
            title: 'Schedule Free Inspection & Test Drive',
            subtitle: 'Experience the vehicle firsthand',
            desc: 'Found a car you love? Book a physical inspection or test-drive appointment directly with verified sellers or at one of our certified inspection hubs in your city at your preferred date and time.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            tag: 'Step 2'
        },
        {
            step: '03',
            title: 'Transparent Pricing & Fair Deal',
            subtitle: 'No middlemen or secret broker fees',
            desc: 'Communicate directly with the car owner. Receive transparent market valuation comparisons so you never overpay. Zero hidden commissions or aggressive middleman markups.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            tag: 'Step 3'
        },
        {
            step: '04',
            title: 'Complete BRTA Transfer & Drive Home',
            subtitle: '100% legal verification and paperwork peace of mind',
            desc: 'Our automotive documentation specialists guide you through authentic ownership transfer at BRTA, verifying tax tokens, fitness certificates, and legal clearance so you drive home with complete security.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            tag: 'Step 4'
        }
    ];

    const sellerSteps = [
        {
            step: '01',
            title: 'List Your Car in Less Than 2 Minutes',
            subtitle: 'Simple, quick, and 100% free listing',
            desc: 'Enter your car make, model, registration year, asking price, and upload clear photos. Add vehicle specs and features using our intuitive listing generator with zero upfront fees.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            ),
            tag: 'Step 1'
        },
        {
            step: '02',
            title: 'Get Verified Seller Badge & Valuation',
            subtitle: 'Boost buyer confidence and selling speed by 4x',
            desc: 'CarBazar reviews your vehicle specs and grants a "Verified Seller" badge. Get intelligent automated valuation suggestions based on live Bangladesh market data to price your car competitively.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            tag: 'Step 2'
        },
        {
            step: '03',
            title: 'Direct Inquiries from Verified Buyers',
            subtitle: 'Zero spam, genuine buyers only',
            desc: 'Interested buyers contact you directly through phone and WhatsApp. Filter out brokers and timewasters, review buyer interest, and manage inquiries seamlessly from your Seller Dashboard.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            tag: 'Step 3'
        },
        {
            step: '04',
            title: 'Safe Handover & Instant Payment',
            subtitle: 'Fast settlement and legal ownership transfer',
            desc: 'Coordinate payment directly via certified bank transfer, cheque, or bKash. We guide you through signing BRTA transfer form 29/30 and finalizing the deal safely.',
            icon: (
                <svg className="w-6 h-6 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            tag: 'Step 4'
        }
    ];

    const faqs = [
        {
            q: 'How does CarBazar physically inspect each vehicle?',
            a: 'Our certified automotive technicians inspect 200+ checkpoints including engine compression, transmission shifting, suspension, chassis frame integrity, AC cooling, electronic OBD diagnostics, and genuine odometer readings.'
        },
        {
            q: 'Are there any hidden broker fees or commission charges?',
            a: 'No. CarBazar connects buyers and sellers directly. You negotiate and pay the agreed price directly with zero hidden middleman brokerage fees.'
        },
        {
            q: 'Can CarBazar assist with BRTA ownership transfer paperwork?',
            a: 'Yes! We provide complete end-to-end guidance and documentation support for BRTA ownership transfer, including Form 29, Form 30, tax token clearance, and digital smart card transfer verification.'
        },
        {
            q: 'How quickly can I sell my car on CarBazar?',
            a: 'On average, competitively priced cars with authentic inspection badges receive multiple serious buyer inquiries within 48 to 72 hours of listing.'
        },
        {
            q: 'Is CarBazar service available outside of Dhaka?',
            a: 'Yes, CarBazar operates across all 64 districts of Bangladesh with certified partner inspection hubs and test drive centers in Chittagong, Sylhet, Rajshahi, Khulna, and beyond.'
        }
    ];

    return (
        <>
            <Head title="How It Works & About Us | CarBazar Bangladesh" />

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

                    {/* ═══ HERO BANNER (ABOUT & HOW IT WORKS WITH REAL BACKGROUND IMAGE) ══════════════════════ */}
                    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-slate-800">
                        {/* Real automotive background image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/images/how-it-works-hero.jpg"
                                alt="CarBazar Modern Automotive Showroom & Roadway"
                                className="w-full h-full object-cover object-center transform scale-105"
                            />
                            {/* Lighter cinematic overlay so the showroom cars, reflections, and highway are clearly visible */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-900/35 to-slate-950/60" />
                        </div>

                        <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-8 text-center">
                            {/* Breadcrumb */}
                            <div className="flex items-center justify-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-blue-300">How It Works</span>
                            </div>

                            <span className="inline-flex items-center gap-2 bg-slate-950/60 backdrop-blur-md text-blue-300 border border-blue-400/40 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg mb-5">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                Transparent, Secure & Trusted Automotive Marketplace
                            </span>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                                Revolutionizing How Bangladesh Buys & Sells Cars
                            </h1>

                            <p className="text-white text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                                CarBazar removes the anxiety and confusion from car transactions. With certified 200+ point inspections, direct buyer-seller interactions, and full legal transfer assistance, we make owning your next car effortless.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/cars"
                                    className="bg-[#1877F2] hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_25px_rgba(24,119,242,0.5)] hover:shadow-[0_6px_30px_rgba(24,119,242,0.7)] transition-all duration-200 flex items-center gap-2 group active:scale-95"
                                >
                                    <span>Browse Verified Cars</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>

                                <Link
                                    href={auth?.user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                    className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
                                >
                                    <span>Sell a Car (Free Listing)</span>
                                </Link>
                            </div>

                            {/* Trust Stats Bar */}
                            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                                {[
                                    { value: '15,000+', label: 'Verified Cars Inspected' },
                                    { value: '45,000+', label: 'Happy Car Owners' },
                                    { value: '64 Districts', label: 'Nationwide Coverage' },
                                    { value: '4.9 ★', label: 'Customer Trust Score' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-slate-950/60 backdrop-blur-md rounded-2xl p-5 border border-white/15 shadow-xl text-center hover:border-blue-400/40 transition-colors">
                                        <div className="text-xl sm:text-2xl font-black text-white mb-0.5 tracking-tight drop-shadow-sm">{stat.value}</div>
                                        <div className="text-xs text-blue-200 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ═══ INTERACTIVE PROCESS TABS (BUYERS VS SELLERS) ═════════════ */}
                    <section className="max-w-[1240px] mx-auto px-6 lg:px-8 py-16">
                        <div className="text-center mb-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">Step-by-Step Experience</span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 mb-3">
                                Simple & Transparent from Start to Finish
                            </h2>
                            <p className="text-gray-600 text-sm max-w-xl mx-auto">
                                Select your perspective below to see how easy and secure it is to navigate CarBazar.
                            </p>

                            {/* Switcher Buttons */}
                            <div className="inline-flex bg-white p-1.5 rounded-2xl border border-gray-200/80 shadow-sm mt-6">
                                <button
                                    type="button"
                                    onClick={() => setActiveWorkflow('buyers')}
                                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                                        activeWorkflow === 'buyers'
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
                                    onClick={() => setActiveWorkflow('sellers')}
                                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                                        activeWorkflow === 'sellers'
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

                        {/* Workflow Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(activeWorkflow === 'buyers' ? buyerSteps : sellerSteps).map((step, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-blue-50 text-[#1877F2] tracking-wider">
                                            {step.tag}
                                        </span>
                                        <span className="text-2xl font-black text-gray-200 group-hover:text-blue-200 transition-colors">
                                            {step.step}
                                        </span>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-blue-50/80 flex items-center justify-center mb-4 text-[#1877F2] group-hover:scale-110 transition-transform">
                                        {step.icon}
                                    </div>

                                    <h3 className="font-bold text-gray-900 text-base mb-1.5 leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs font-semibold text-gray-400 mb-3">
                                        {step.subtitle}
                                    </p>
                                    <p className="text-xs text-gray-600 leading-relaxed mt-auto">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ═══ ABOUT CARBAZAR: MISSION & TRUST PILLARS ═════════════════ */}
                    <section className="bg-white py-16 border-y border-gray-200/80">
                        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                {/* Left Story */}
                                <div className="lg:col-span-5">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">Our Mission</span>
                                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 mb-4 tracking-tight leading-snug">
                                        Built to Solve Every Pain Point in the Bangladesh Automotive Market
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        For years, purchasing a used car in Bangladesh meant dealing with hidden accidental histories, tampered odometers, inflated middleman broker commissions, and cumbersome BRTA paperwork.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        CarBazar was built to introduce complete technological transparency. We combine certified physical inspections, authentic digital specifications, and verified seller profiles to create a safe, joyful car shopping experience.
                                    </p>

                                    <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0 mt-0.5">
                                            ✓
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs text-gray-900">Zero Middleman Guarantee</h4>
                                            <p className="text-xs text-gray-600 mt-0.5">Direct deals between buyer and seller with authentic market valuations.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: 4 Trust Pillars Cards */}
                                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[
                                        {
                                            title: '200+ Point Inspection',
                                            desc: 'Engine, transmission, chassis, suspension, AC, and electronics certified by automotive experts.',
                                            icon: '🔍',
                                        },
                                        {
                                            title: 'Direct Buyer-Seller Chat',
                                            desc: 'Connect directly via phone & WhatsApp without middlemen skimming arbitrary profit margins.',
                                            icon: '💬',
                                        },
                                        {
                                            title: '100% BRTA Legal Clearance',
                                            desc: 'Tax tokens, fitness certificates, and smart-card registration authenticated before listing.',
                                            icon: '📋',
                                        },
                                        {
                                            title: 'Nationwide Network',
                                            desc: '120+ inspection and test-drive hubs across Dhaka, Chittagong, Sylhet, and other divisions.',
                                            icon: '🇧🇩',
                                        },
                                    ].map((pillar, i) => (
                                        <div key={i} className="bg-slate-50 border border-gray-200/80 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all">
                                            <div className="text-2xl mb-3">{pillar.icon}</div>
                                            <h3 className="font-bold text-sm text-gray-900 mb-1">{pillar.title}</h3>
                                            <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══ FREQUENTLY ASKED QUESTIONS (FAQ) ════════════════════════ */}
                    <section className="max-w-[900px] mx-auto px-6 lg:px-8 py-16">
                        <div className="text-center mb-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">Got Questions?</span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 mb-2">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Find answers to common questions about purchasing, selling, and inspecting vehicles on CarBazar.
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
                    <section className="max-w-[1240px] mx-auto px-6 lg:px-8 pb-20">
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
                                        className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                                    >
                                        Explore Cars Collection
                                    </Link>
                                    <Link
                                        href={auth?.user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                        className="bg-[#1877F2] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all border border-blue-300/40 shadow-md"
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
