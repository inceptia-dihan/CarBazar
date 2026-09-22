<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use App\Models\CarModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CarListingController extends Controller
{
    /**
     * Store a newly created car listing in the database.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'year' => 'required|integer|min:1970|max:'.(date('Y') + 1),
            'condition' => 'required|string|max:50',
            'category' => 'nullable|string|max:50',
            'asking_price' => 'required|string|max:50',
            'engine' => 'nullable|string|max:100',
            'fuel_type' => 'nullable|string|max:50',
            'body_type' => 'nullable|string|max:50',
            'transmission' => 'nullable|string|max:50',
            'drive' => 'nullable|string|max:50',
            'mileage' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'registration_year' => 'nullable|string|max:50',
            'location' => 'required|string|max:150',
            'description' => 'nullable|string|max:5000',
            'equipment' => 'nullable|array',
            'equipment.*' => 'string|max:100',
            'phone' => 'nullable|string|max:30',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:8192',
            'preset_image' => 'nullable|string',
        ]);

        // Process uploaded images
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $index => $file) {
                if ($file->isValid()) {
                    $path = $file->store('cars', 'public');
                    $photoUrl = Storage::url($path);
                    $photoPaths[] = [
                        'src' => $photoUrl,
                        'thumb' => $photoUrl,
                        'title' => $validated['name'].' - Photo '.($index + 1),
                    ];
                }
            }
        }

        // Fallback images if no photos uploaded
        if (empty($photoPaths)) {
            $fallback = $request->input('preset_image') ?: '/images/corolla-cross-1.jpg';
            $photoPaths = [
                ['src' => $fallback, 'thumb' => $fallback, 'title' => $validated['name'].' Main View'],
                ['src' => '/images/corolla-cross-2.jpg', 'thumb' => '/images/corolla-cross-2.jpg', 'title' => $validated['name'].' Side Angle'],
                ['src' => '/images/corolla-cross-3.jpg', 'thumb' => '/images/corolla-cross-3.jpg', 'title' => $validated['name'].' Interior & Cockpit'],
            ];
        }

        $mainImage = $photoPaths[0]['src'];

        // Brand and Model lookup
        $brandModel = Brand::where('name', $validated['brand'])->first();
        $brandId = $brandModel?->id;
        $carModelRecord = CarModel::where('name', $validated['model'])->where('brand_id', $brandId)->first();
        $carModelId = $carModelRecord?->id;

        // Clean price formatting
        $rawPrice = preg_replace('/[^0-9]/', '', $validated['asking_price']);
        $numPrice = (int) $rawPrice;
        if ($numPrice > 0) {
            $lakhValue = round($numPrice / 100000, 2);
            $priceLakh = $lakhValue.' Lakh';
            $formattedPrice = '৳ '.number_format($numPrice);
        } else {
            $priceLakh = $validated['asking_price'];
            $formattedPrice = $validated['asking_price'];
        }

        // Build Key Specifications
        $keySpecifications = [
            ['label' => 'Year', 'value' => (string) $validated['year']],
            ['label' => 'Condition', 'value' => $validated['condition']],
            ['label' => 'Engine', 'value' => $validated['engine'] ?: '1.8L Multi-Valve'],
            ['label' => 'Fuel Type', 'value' => $validated['fuel_type'] ?: 'Octane'],
            ['label' => 'Body Type', 'value' => $validated['body_type'] ?: 'Sedan'],
            ['label' => 'Drive / Wheel', 'value' => $validated['drive'] ?: 'FWD'],
            ['label' => 'Mileage', 'value' => $validated['mileage'] ? ($validated['mileage'].' km') : '20,000 km'],
            ['label' => 'Transmission', 'value' => $validated['transmission'] ?: 'Automatic'],
            ['label' => 'Color', 'value' => $validated['color'] ?: 'Silver Metallic'],
            ['label' => 'Interior', 'value' => 'Premium Fabric / Leather'],
            ['label' => 'Registration', 'value' => $validated['registration_year'] ?: (string) $validated['year']],
        ];

        // Equipment list
        $equipmentList = ! empty($validated['equipment'])
            ? $validated['equipment']
            : [
                'Push Start & Keyless Entry',
                'Automatic Climate Control AC',
                'Dual SRS Airbags & ABS with EBD',
                'Multi-Function Steering Controls',
                'Alloy Wheels with Tubeless Tires',
                'Rear Parking Camera with Assist Guidelines',
            ];

        // Seller Highlights
        $highlights = [
            [
                'title' => 'Genuine Mileage & Condition',
                'desc' => 'Certified odo reading with verifiable auction sheet and full maintenance records.',
                'type' => 'condition',
            ],
            [
                'title' => 'Up-to-date BRTA Papers',
                'desc' => 'All registration, fitness, and tax token papers are fully verified and up to date.',
                'type' => 'document',
            ],
            [
                'title' => 'Pre-Inspection Certified',
                'desc' => '100% genuine vehicle without any major accidental history or frame damage.',
                'type' => 'tech',
            ],
        ];

        // Seller info
        $seller = [
            'name' => $user->name,
            'verified' => true,
            'memberSince' => 'Member since '.($user->created_at ? $user->created_at->format('Y') : date('Y')),
            'responseTime' => 'Replies in ~15 mins',
            'rating' => '5.0',
            'phone' => $validated['phone'] ?: '+880 1711-000000',
            'avatar' => '/images/avatar-1.jpg',
        ];

        // Generate unique slug
        $baseSlug = Str::slug($validated['name']);
        $uniqueSlug = $baseSlug.'-'.Str::lower(Str::random(5));

        // Create the Car record
        Car::create([
            'user_id' => $user->id,
            'slug' => $uniqueSlug,
            'name' => $validated['name'],
            'brand_id' => $brandId,
            'car_model_id' => $carModelId,
            'brand' => $validated['brand'],
            'model' => $validated['model'],
            'year' => (int) $validated['year'],
            'condition' => $validated['condition'],
            'category' => $validated['category'] ?: 'popular',
            'asking_price' => $formattedPrice,
            'price_lakh' => $priceLakh,
            'daily_price' => (string) round($numPrice / 1000),
            'rating' => '5.0',
            'reviews' => '1',
            'passengers' => 5,
            'doors' => 4,
            'type' => $validated['transmission'] ?: 'Automatic',
            'ac' => true,
            'location' => $validated['location'],
            'views' => 1,
            'published_date' => date('d M Y'),
            'tag' => 'Verified Owner Listing',
            'main_image' => $mainImage,
            'headline' => $validated['name'].' in Excellent Running Condition',
            'description' => $validated['description'] ?: ($validated['name'].' is up for sale in immaculate condition. Carefully driven, fully maintained on schedule, and equipped with premium features. Test drives welcome in '.$validated['location'].'.'),
            'photos' => $photoPaths,
            'key_specifications' => $keySpecifications,
            'highlights' => $highlights,
            'equipment_list' => $equipmentList,
            'seller' => $seller,
            'is_featured' => false,
        ]);

        return redirect()->route('dashboard')->with('success', 'Your vehicle listing has been published to CarBazar!');
    }

    /**
     * Delete a car listing owned by the authenticated user.
     */
    public function destroy(Request $request, Car $car): RedirectResponse
    {
        if ($car->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $car->delete();

        return redirect()->route('dashboard')->with('success', 'Car listing removed successfully.');
    }
}
