<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard with listings, wishlist, inquiries, and stats.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Fetch user's actual database listings
        $realUserListings = Car::where('user_id', $user->id)->latest()->get()->map(function ($car) {
            $arr = $car->toArray();
            $arr['listingStatus'] = 'Active';
            $arr['viewsCount'] = $car->views ?: 1;
            $arr['inquiriesCount'] = 0;
            $arr['postedAt'] = $car->created_at ? $car->created_at->diffForHumans() : 'Just now';

            return $arr;
        });

        // If user has no uploaded listings yet, provide default showcase listings
        if ($realUserListings->isEmpty()) {
            $allCars = Car::orderBy('id')->get();
            $userListings = $allCars->slice(0, 2)->values()->map(function ($car, $index) {
                $carArray = $car->toArray();
                $carArray['listingStatus'] = $index === 0 ? 'Active' : 'Under Review';
                $carArray['viewsCount'] = $index === 0 ? 1240 : 400;
                $carArray['inquiriesCount'] = $index === 0 ? 8 : 4;
                $carArray['postedAt'] = '3 days ago';

                return $carArray;
            });
        } else {
            $userListings = $realUserListings;
        }

        // Saved wishlist cars
        $savedCars = Car::orderBy('id')->skip(2)->take(4)->get();

        // Recommended / Market Watch cars
        $recommendedCars = Car::orderBy('id')->skip(6)->take(4)->get();

        // Inquiries on user's vehicles
        $inquiries = [
            [
                'id' => 1,
                'buyerName' => 'Tariqul Islam',
                'buyerEmail' => 'tariqul@example.com',
                'buyerPhone' => '+880 1711-234567',
                'carTitle' => $userListings->first()['name'] ?? 'Toyota Corolla Cross',
                'carSlug' => $userListings->first()['slug'] ?? 'toyota-corolla-cross-hybrid-2021',
                'carImage' => $userListings->first()['mainImage'] ?? '/images/corolla-cross-1.jpg',
                'message' => 'Hello! Is this vehicle still available for inspection this Friday? What is your final offer for cash payment?',
                'time' => '2 hours ago',
                'status' => 'Unread',
            ],
            [
                'id' => 2,
                'buyerName' => 'Farhana Rahman',
                'buyerEmail' => 'farhana.r@example.com',
                'buyerPhone' => '+880 1822-987654',
                'carTitle' => $userListings->first()['name'] ?? 'Toyota Corolla Cross',
                'carSlug' => $userListings->first()['slug'] ?? 'toyota-corolla-cross-hybrid-2021',
                'carImage' => $userListings->first()['mainImage'] ?? '/images/corolla-cross-1.jpg',
                'message' => 'Can I have the full BRTA registration documents copies sent to my WhatsApp? Interested in test driving.',
                'time' => 'Yesterday',
                'status' => 'Replied',
            ],
            [
                'id' => 3,
                'buyerName' => 'Naimul Hasan',
                'buyerEmail' => 'naimul.h@example.com',
                'buyerPhone' => '+880 1912-345678',
                'carTitle' => $userListings->last()['name'] ?? 'BMW M3 Competition',
                'carSlug' => $userListings->last()['slug'] ?? 'bmw-m3',
                'carImage' => $userListings->last()['mainImage'] ?? '/images/bmw-car.jpg',
                'message' => 'Are there any scratches on the body or interior? Has the battery condition been verified recently?',
                'time' => '3 days ago',
                'status' => 'Replied',
            ],
        ];

        // Stats summary
        $stats = [
            'activeListings' => $userListings->count(),
            'savedCars' => $savedCars->count(),
            'totalInquiries' => count($inquiries),
            'totalViews' => $userListings->sum('viewsCount'),
        ];

        // Brands with their models for dynamic dropdowns
        $brandsWithModels = Brand::with('models')->orderBy('name')->get()->map(function ($b) {
            return [
                'name' => $b->name,
                'models' => $b->models->pluck('name')->toArray(),
            ];
        });

        return Inertia::render('Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'userListings' => $userListings,
            'savedCars' => $savedCars,
            'recommendedCars' => $recommendedCars,
            'inquiries' => $inquiries,
            'brandsWithModels' => $brandsWithModels,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
