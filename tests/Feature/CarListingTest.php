<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class CarListingTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_post_car_listing(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $photo = UploadedFile::fake()->image('my_car.jpg', 800, 600);

        $response = $this->actingAs($user)->post('/dashboard/listings', [
            'name' => '2023 Toyota Land Cruiser Prado TX-L',
            'brand' => 'Toyota',
            'model' => 'Land Cruiser',
            'year' => 2023,
            'condition' => 'Reconditioned',
            'category' => 'off-road',
            'asking_price' => '৳ 1,45,00,000',
            'engine' => '2.8L Turbo Diesel',
            'fuel_type' => 'Diesel',
            'body_type' => 'SUV',
            'transmission' => 'Automatic',
            'drive' => '4WD',
            'mileage' => '12,000',
            'color' => 'Attitude Black Mica',
            'registration_year' => '2023',
            'location' => 'Gulshan, Dhaka',
            'description' => 'Mint condition Land Cruiser Prado with panoramic camera and sunroof.',
            'equipment' => ['Sunroof / Moonroof', 'Push Start Button', '360° View Camera'],
            'phone' => '+880 1711-234567',
            'photos' => [$photo],
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('cars', [
            'name' => '2023 Toyota Land Cruiser Prado TX-L',
            'user_id' => $user->id,
            'brand' => 'Toyota',
        ]);

        $car = Car::where('user_id', $user->id)->first();
        $this->assertNotNull($car);
        $this->assertEquals('Toyota', $car->brand);
        $this->assertEquals(2023, $car->year);
        $this->assertNotEmpty($car->photos);
    }

    public function test_user_can_delete_their_own_car_listing(): void
    {
        $user = User::factory()->create();
        $car = Car::create([
            'user_id' => $user->id,
            'slug' => 'test-car-'.rand(100, 999),
            'name' => 'Test Car',
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'year' => 2020,
            'condition' => 'Used',
            'category' => 'popular',
            'asking_price' => '৳ 20,00,000',
            'price_lakh' => '20 Lakh',
            'daily_price' => '20',
            'location' => 'Dhaka',
            'published_date' => '21 Sep 2026',
            'main_image' => '/images/hero-car.jpg',
        ]);

        $response = $this->actingAs($user)->delete("/dashboard/listings/{$car->id}");

        $response->assertRedirect(route('dashboard'));
        $this->assertDatabaseMissing('cars', ['id' => $car->id]);
    }

    public function test_user_cannot_delete_another_users_car(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();

        $car = Car::create([
            'user_id' => $owner->id,
            'slug' => 'protected-car-'.rand(100, 999),
            'name' => 'Protected Car',
            'brand' => 'BMW',
            'model' => 'M3',
            'year' => 2022,
            'condition' => 'Used',
            'category' => 'popular',
            'asking_price' => '৳ 90,00,000',
            'price_lakh' => '90 Lakh',
            'daily_price' => '90',
            'location' => 'Dhaka',
            'published_date' => '21 Sep 2026',
            'main_image' => '/images/bmw-car.jpg',
        ]);

        $response = $this->actingAs($attacker)->delete("/dashboard/listings/{$car->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('cars', ['id' => $car->id]);
    }

    public function test_posted_car_listing_details_page_loads_successfully(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['name' => 'Mujahid Dihan']);
        $photo = UploadedFile::fake()->image('lexus.jpg', 800, 600);

        $this->actingAs($user)->post('/dashboard/listings', [
            'name' => '2023 Lexus ES 350 Ultra Luxury',
            'brand' => 'Lexus',
            'model' => 'ES 350',
            'year' => 2023,
            'condition' => 'Reconditioned',
            'category' => 'luxury',
            'asking_price' => '৳ 78,00,000',
            'engine' => '3.5L V6 DOHC',
            'fuel_type' => 'Octane',
            'body_type' => 'Sedan',
            'transmission' => 'Automatic',
            'drive' => 'FWD',
            'mileage' => '15,000',
            'color' => 'Eminent White Pearl',
            'registration_year' => '2023',
            'location' => 'Gulshan-2, Dhaka',
            'description' => 'Single owner driven, excellent running condition.',
            'equipment' => ['Mark Levinson Audio', 'Panoramic View Monitor', 'Head-Up Display'],
            'phone' => '+880 1968714099',
            'photos' => [$photo],
        ]);

        $car = Car::where('name', '2023 Lexus ES 350 Ultra Luxury')->first();
        $this->assertNotNull($car);

        $response = $this->get("/car/{$car->slug}");
        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('CarDetails')
            ->where('slug', $car->slug)
            ->where('car.name', '2023 Lexus ES 350 Ultra Luxury')
            ->has('recommendedCars')
        );
    }
}
