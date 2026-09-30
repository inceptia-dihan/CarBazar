import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer({ user: propUser }) {
    const pageProps = usePage()?.props || {};
    const user = propUser !== undefined ? propUser : pageProps.auth?.user;

    return (
        <footer className="bg-[#051C34] text-slate-300 pt-16 pb-8 border-t border-[#082342] w-full">
            <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-36">
                <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-10 lg:gap-8 mb-16">
                    {/* Column 1: Brand & Contact Info */}
                    <div className="space-y-6 max-w-xs min-w-[220px]">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                </svg>
                            </div>
                            <span className="text-white font-black text-[18px] tracking-tight group-hover:text-blue-400 transition-colors">CarBazar</span>
                        </Link>

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

                    {/* Column 2: Our Marketplace */}
                    <div className="min-w-[120px]">
                        <h4 className="text-white font-medium text-[15px] mb-4">Our Marketplace</h4>
                        <ul className="space-y-2.5 text-[13px] text-slate-300/90 font-normal">
                            <li><a href="/#cars-section" className="hover:text-white transition-colors">Certified Cars</a></li>
                            <li><Link href="/cars" className="hover:text-white transition-colors">Brand New Cars</Link></li>
                            <li>
                                <Link
                                    href={user ? `${route('dashboard')}?action=sell` : `${route('login')}?role=seller`}
                                    className="hover:text-white transition-colors"
                                >
                                    Sell Your Car
                                </Link>
                            </li>
                            <li><a href="/#why-choose-us-section" className="hover:text-white transition-colors">Inspection Reports</a></li>
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
                            <li><Link href="/why-choose-us" className="hover:text-white transition-colors">Why choose us</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
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
    );
}
