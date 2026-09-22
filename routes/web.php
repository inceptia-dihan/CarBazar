<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CarListingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CarController::class, 'index'])->name('home');
Route::get('/car/{slug?}', [CarController::class, 'show'])->name('car.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/listings', [CarListingController::class, 'store'])->name('listings.store');
    Route::delete('/dashboard/listings/{car}', [CarListingController::class, 'destroy'])->name('listings.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Authentication & Control Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'create'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'store'])->name('login.store');
    Route::post('/logout', [AdminAuthController::class, 'destroy'])->name('logout');

    Route::middleware(['admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::patch('/listings/{car}/toggle-featured', [AdminController::class, 'toggleFeatured'])->name('listings.toggleFeatured');
        Route::delete('/listings/{car}', [AdminController::class, 'deleteListing'])->name('listings.delete');
        Route::patch('/users/{user}/toggle-admin', [AdminController::class, 'toggleAdmin'])->name('users.toggleAdmin');
        Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.delete');
        Route::post('/brands', [AdminController::class, 'storeBrand'])->name('brands.store');
        Route::delete('/brands/{brand}', [AdminController::class, 'deleteBrand'])->name('brands.delete');
    });
});

require __DIR__.'/auth.php';
