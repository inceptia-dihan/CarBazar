import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function WhyChooseUs({ auth }) {
    const [openFaq, setOpenFaq] = useState(0);

    const reasons = [
        {
            icon: (
                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Best market price guaranteed',
            desc: 'Looking for the best deal? We ensure competitive pricing and transparent market valuation for every car.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: '150-Point Inspection',
            desc: 'Every car listed undergoes a thorough mechanical, electrical, and structural multi-point inspection.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Verified Ownership & Papers',
            desc: '100% verified BRTA documents, tax token, fitness, and seamless ownership transfer assistance.'
        },
        {
            icon: (
                <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Dedicated Customer Support',
            desc: 'Have questions about a car? Contact CarBazar support team anytime for expert automotive guidance.'
        }
    ];

    const comparisonItems = [
        {
            feature: 'Physical Car Inspection',
            carbazar: 'Certified 150+ point diagnostic check with authentic published reports',
            traditional: 'Visual check only, risks of hidden engine/chassis defects'
        },
        {
            feature: 'Broker & Middleman Fees',
            carbazar: '0% Middleman Fees — deal directly with verified owners',
            traditional: '3% to 5% secret commission added to price'
        },
        {
            feature: 'Legal & Paperwork Safety',
            carbazar: 'Form 29/30 support, BRTA tax token & fitness verification',
            traditional: 'Buyer bears all risks of fake documents and pending fines'
        },
        {
            feature: 'Market Price Transparency',
            carbazar: 'AI-assisted fair market value estimation based on Bangladesh data',
            traditional: 'Arbitrarily inflated showroom markups'
        },
        {
            feature: 'Customer Assistance',
            carbazar: 'Dedicated automotive consultants from search to keys handover',
            traditional: 'Zero accountability once deal is finalized'
        }
    ];

    const faqs = [
        {
            q: 'Why should I choose CarBazar instead of traditional brokers?',
            a: 'CarBazar eliminates middlemen commissions, provides certified 150-point inspection reports, ensures 100% legal document verification, and connects you directly with genuine sellers for transparent deals.'
        },
        {
            q: 'How does the 150-point inspection work?',
            a: 'Our certified automotive technicians inspect engine compression, transmission gear shifting, suspension components, brake rotors, chassis frame integrity, electronics, AC cooling, and genuine odometer readings.'
        },
        {
            q: 'Does CarBazar assist with BRTA vehicle ownership transfer?',
            a: 'Yes! We provide complete end-to-end guidance for BRTA Form 29, Form 30, tax token clearance, digital smart card authentication, and physical biometric transfer verification.'
        },
        {
            q: 'Is CarBazar free for car sellers?',
            a: 'Yes, basic vehicle listings are completely free with zero upfront charges. You get access to verified buyers, automated valuation, and direct phone/WhatsApp inquiries.'
        }
    ];

    return (
        <>
            <Head title="Why Choose Us | CarBazar Bangladesh" />

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
                                <Link href="/how-it-works" className="hover:text-[#1877F2] transition-colors">How it works</Link>
                                <Link href="/why-choose-us" className="text-[#1877F2] font-bold">Why choose us</Link>
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
                        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
                            <Link href="/" className="hover:text-[#1877F2] transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-[#1877F2] font-bold">Why choose us</span>
                        </div>
                    </div>

                    {/* ═══ WHY CHOOSE US PRIMARY HERO SECTION (HOMEPAGE DESIGN) ═══ */}
                    <section id="why-choose-us-section" className="bg-white py-12 lg:py-16 overflow-hidden">
                        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                                {/* Left — Image from user */}
                                <div className="lg:w-[50%] relative flex items-center justify-center">
                                    <div className="relative w-full">
                                        <div className="absolute inset-0 bg-blue-50/50 rounded-3xl -rotate-1 transform scale-95 -z-10" />
                                        <img
                                            src="/images/why-choose-us.png"
                                            alt="Why Choose Us Car"
                                            className="w-full h-auto max-h-[500px] object-contain object-center drop-shadow-lg"
                                        />
                                    </div>
                                </div>

                                {/* Right — text content */}
                                <div className="lg:w-[50%] lg:pl-4 pt-4 lg:pt-0">
                                    {/* Badge */}
                                    <div className="inline-block bg-[#EBF3FE] text-[#1877F2] text-[11px] font-bold tracking-wider px-4 py-1.5 rounded mb-4">
                                        WHY CHOOSE US
                                    </div>

                                    <h1 className="text-[1.85rem] sm:text-[2.2rem] font-bold text-gray-900 leading-snug mb-4">
                                        We offer the best experience when buying or selling your car
                                    </h1>

                                    <p className="text-gray-600 text-[14px] leading-relaxed mb-7">
                                        Experience complete peace of mind in the Bangladesh automotive marketplace. We combine verified inspections, zero-middleman deals, and seamless legal transfer to make every transaction effortless.
                                    </p>

                                    {/* Features list */}
                                    <div className="space-y-5 mb-8">
                                        {reasons.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-4 p-3 rounded-2xl transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-gray-100"
                                            >
                                                <div className="w-11 h-11 rounded-xl bg-[#EBF3FE] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-[15px] mb-1">{item.title}</div>
                                                    <div className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                                        <Link
                                            href="/cars"
                                            className="bg-[#1877F2] hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 shadow-md hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer group"
                                        >
                                            <span>Explore Available Cars</span>
                                            <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                        <Link
                                            href={auth?.user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                            className="border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 px-5 py-3 rounded-xl font-bold text-[13px] transition-colors cursor-pointer"
                                        >
                                            Sell Your Car Free
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══ TRUST STATS COUNTER ═════════════════════════════════════ */}
                    <section className="bg-slate-900 text-white py-14">
                        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                {[
                                    { value: '15,000+', label: 'Verified Cars Inspected' },
                                    { value: '45,000+', label: 'Happy Buyers & Sellers' },
                                    { value: '64 Districts', label: 'Nationwide Network Hubs' },
                                    { value: '100% Legal', label: 'BRTA Paperwork Authenticity' },
                                ].map((stat, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">{stat.value}</div>
                                        <div className="text-xs sm:text-sm text-slate-300 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ═══ COMPARISON: CARBAZAR VS TRADITIONAL MARKET ══════════════ */}
                    <section className="bg-white py-16 border-b border-gray-200/80">
                        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
                            <div className="text-center mb-12">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2]">The CarBazar Advantage</span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-3">
                                    How CarBazar Compares to Traditional Brokers
                                </h2>
                                <p className="text-gray-600 text-sm max-w-xl mx-auto">
                                    See why smart car buyers and sellers in Bangladesh are leaving behind traditional middleman headaches.
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-xs sm:text-sm">
                                            <th className="py-4 px-4 font-bold text-gray-500 uppercase tracking-wider w-1/3">Feature</th>
                                            <th className="py-4 px-4 font-bold text-[#1877F2] uppercase tracking-wider bg-blue-50/60 rounded-t-xl w-1/3">
                                                CarBazar Experience
                                            </th>
                                            <th className="py-4 px-4 font-bold text-gray-400 uppercase tracking-wider w-1/3">
                                                Traditional Brokers
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                                        {comparisonItems.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                                                <td className="py-4 px-4 font-bold text-gray-900">{item.feature}</td>
                                                <td className="py-4 px-4 bg-blue-50/30 text-gray-900 font-semibold flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1877F2] flex items-center justify-center text-xs font-black shrink-0">
                                                        ✓
                                                    </span>
                                                    <span>{item.carbazar}</span>
                                                </td>
                                                <td className="py-4 px-4 text-gray-500">
                                                    <span className="text-red-500 mr-2 font-bold">✕</span>
                                                    {item.traditional}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                Everything you need to know about our standards, guarantees, and services.
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
                    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 pb-20">
                        <div className="bg-gradient-to-r from-[#0B1E34] to-[#1877F2] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
                                    Ready to Experience the CarBazar Difference?
                                </h2>
                                <p className="text-blue-100 text-xs sm:text-sm mb-8 leading-relaxed">
                                    Join thousands of verified car buyers and sellers in Bangladesh. Browse inspected vehicles or list your car in minutes.
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
