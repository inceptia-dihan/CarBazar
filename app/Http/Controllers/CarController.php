<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class CarController extends Controller
{
    /**
     * Display the home page with car listings and brands.
     */
    public function index(Request $request): Response
    {
        $cars = Car::latest()->get();
        $popularBrands = Brand::where('popular', true)->with('models')->get();

        return Inertia::render('Welcome', [
            'collectionCars' => $cars,
            'popularBrands' => $popularBrands,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    /**
     * Display the dedicated cars collection page.
     */
    public function cars(Request $request): Response
    {
        $cars = Car::latest()->get();
        $popularBrands = Brand::where('popular', true)->with('models')->get();

        return Inertia::render('Cars', [
            'collectionCars' => $cars,
            'popularBrands' => $popularBrands,
            'initialFilters' => [
                'brand' => $request->query('brand', ''),
                'model' => $request->query('model', ''),
                'category' => $request->query('category', 'all'),
                'bodyType' => $request->query('bodyType', ''),
                'minPrice' => $request->query('minPrice', null),
                'maxPrice' => $request->query('maxPrice', null),
                'condition' => $request->query('condition', 'all'),
            ],
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    /**
     * Display a single car details page.
     */
    public function show(?string $slug = null): Response
    {
        $defaultSlug = 'toyota-corolla-cross-hybrid-2021';
        $targetSlug = $slug ?: $defaultSlug;

        $car = Car::where('slug', $targetSlug)->first()
            ?? Car::where('slug', $defaultSlug)->first()
            ?? Car::first();

        $recommendedCars = Car::where('id', '!=', $car?->id)->latest()->limit(4)->get();

        return Inertia::render('CarDetails', [
            'slug' => $car?->slug ?? $targetSlug,
            'car' => $car,
            'recommendedCars' => $recommendedCars,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    /**
     * Display the How It Works / About page.
     */
    public function howItWorks(): Response
    {
        return Inertia::render('HowItWorks', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    /**
     * Display the Why Choose Us page.
     */
    public function whyChooseUs(): Response
    {
        return Inertia::render('WhyChooseUs', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
