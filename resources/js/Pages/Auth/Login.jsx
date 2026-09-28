import React, { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const isInitialSeller = urlParams.get('role') === 'seller' || urlParams.get('intent') === 'sell';

    const [isSeller, setIsSeller] = useState(isInitialSeller);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login') + (isSeller ? '?role=seller' : ''), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={isSeller ? "Seller Login - CarBazar" : "Log in - CarBazar"} />

            {/* ═══ ROLE SELECTOR TABS ═══ */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-5">
                <button
                    type="button"
                    onClick={() => setIsSeller(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        !isSeller
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                    Buyer / User
                </button>
                <button
                    type="button"
                    onClick={() => setIsSeller(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSeller
                            ? 'bg-[#1877F2] text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Seller Login</span>
                </button>
            </div>

            {/* ═══ SELLER BADGE BANNER ═══ */}
            {isSeller ? (
                <div className="mb-5 p-3.5 bg-blue-50/90 border border-blue-200/90 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 leading-tight">Seller Account Login</h2>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                            Sign in to list, manage and sell your vehicles with verified buyers on CarBazar.
                        </p>
                    </div>
                </div>
            ) : null}

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value={isSeller ? "Seller Email Address" : "Email"} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        placeholder={isSeller ? "seller@example.com" : "user@example.com"}
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs text-gray-600 font-medium">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-xs text-gray-600 underline hover:text-[#1877F2] transition-colors"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="mt-5">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1877F2] hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                        <span>{isSeller ? 'Log in as Seller' : 'Log in'}</span>
                        <span>→</span>
                    </button>
                </div>

                {/* Register Link */}
                <div className="mt-4 text-center">
                    <span className="text-xs text-gray-500">
                        {isSeller ? "Want to sell cars on CarBazar? " : "Don't have an account? "}
                    </span>
                    <Link
                        href={route('register') + (isSeller ? '?role=seller' : '')}
                        className="text-xs font-bold text-[#1877F2] hover:text-blue-800 hover:underline"
                    >
                        {isSeller ? 'Register as a Seller' : 'Sign up'}
                    </Link>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Platform Administrator?</span>
                    <Link
                        href={route('admin.login')}
                        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                        <span>Access Admin Console</span>
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
