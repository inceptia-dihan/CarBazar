<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Car;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the comprehensive admin dashboard.
     */
    public function index(Request $request): Response
    {
        $stats = [
            'totalCars' => Car::count(),
            'totalUsers' => User::count(),
            'totalSellers' => User::where('is_admin', false)->count(),
            'featuredCars' => Car::where('is_featured', true)->count(),
            'totalBrands' => Brand::count(),
        ];

        // All listings with seller info
        $listings = Car::with('user:id,name,email')
            ->latest()
            ->get()
            ->map(function ($car) {
                return [
                    'id' => $car->id,
                    'name' => $car->name,
                    'slug' => $car->slug,
                    'brand' => $car->brand,
                    'model' => $car->model,
                    'year' => $car->year,
                    'asking_price' => $car->asking_price,
                    'location' => $car->location,
                    'category' => $car->category,
                    'condition' => $car->condition,
                    'views' => $car->views ?? 0,
                    'is_featured' => (bool) $car->is_featured,
                    'main_image' => $car->main_image,
                    'seller_name' => $car->user?->name ?? 'External Seller',
                    'seller_email' => $car->user?->email ?? 'N/A',
                    'created_at' => $car->created_at ? $car->created_at->format('M d, Y') : 'N/A',
                ];
            });

        // All users with car count
        $users = User::withCount('cars')
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => (bool) $user->is_admin,
                    'cars_count' => $user->cars_count,
                    'created_at' => $user->created_at ? $user->created_at->format('M d, Y') : 'N/A',
                ];
            });

        // All brands with model counts
        $brands = Brand::withCount('models')
            ->orderBy('name')
            ->get()
            ->map(function ($brand) {
                return [
                    'id' => $brand->id,
                    'name' => $brand->name,
                    'slug' => $brand->slug,
                    'popular' => (bool) $brand->popular,
                    'models_count' => $brand->models_count,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'admin' => $request->user(),
            'stats' => $stats,
            'listings' => $listings,
            'users' => $users,
            'brands' => $brands,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Toggle featured status for a car listing.
     */
    public function toggleFeatured(Car $car): RedirectResponse
    {
        $newStatus = ! (bool) $car->is_featured;
        $car->update(['is_featured' => $newStatus]);

        $statusText = $newStatus ? 'marked as Featured' : 'removed from Featured';

        return back()->with('success', "Listing '{$car->name}' has been {$statusText}.");
    }

    /**
     * Delete a car listing from the platform.
     */
    public function deleteListing(Car $car): RedirectResponse
    {
        $name = $car->name;
        $car->delete();

        return back()->with('success', "Vehicle listing '{$name}' was successfully removed.");
    }

    /**
     * Toggle administrator role for a user.
     */
    public function toggleAdmin(User $user, Request $request): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot change your own administrator status.');
        }

        $newRole = ! (bool) $user->is_admin;
        $user->update(['is_admin' => $newRole]);

        $roleTitle = $newRole ? 'Administrator' : 'Seller';

        return back()->with('success', "User '{$user->name}' is now a {$roleTitle}.");
    }

    /**
     * Delete a user/seller and their vehicles from the platform.
     */
    public function deleteUser(User $user, Request $request): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot delete your own active administrator account.');
        }

        $userName = $user->name;
        $user->cars()->delete();
        $user->delete();

        return back()->with('success', "User '{$userName}' and all their listings have been deleted.");
    }

    /**
     * Store a new brand.
     */
    public function storeBrand(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:brands,name'],
            'popular' => ['nullable', 'boolean'],
        ]);

        Brand::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'popular' => $request->boolean('popular'),
        ]);

        return back()->with('success', "Brand '{$validated['name']}' added successfully.");
    }

    /**
     * Delete a brand.
     */
    public function deleteBrand(Brand $brand): RedirectResponse
    {
        $brandName = $brand->name;
        $brand->models()->delete();
        $brand->delete();

        return back()->with('success', "Brand '{$brandName}' and associated models deleted.");
    }
}
