<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\Car;
use App\Models\CarModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CarDatabaseTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_database_has_seeded_brands_and_car_models(): void
    {
        $this->assertGreaterThanOrEqual(35, Brand::count());
        $this->assertGreaterThanOrEqual(200, CarModel::count());

        $toyota = Brand::where('slug', 'toyota')->first();
        $this->assertNotNull($toyota);
        $this->assertTrue($toyota->popular);
        $this->assertTrue($toyota->models()->where('slug', 'corolla')->exists());
    }

    public function test_database_has_seeded_cars_with_proper_attributes_and_casts(): void
    {
        $this->assertGreaterThanOrEqual(5, Car::count());

        $corolla = Car::where('slug', 'toyota-corolla-cross-hybrid-2021')->first();
        $this->assertNotNull($corolla);
        $this->assertEquals('Toyota', $corolla->brand);
        $this->assertEquals(2021, $corolla->year);
        $this->assertTrue($corolla->ac);
        $this->assertIsArray($corolla->photos);
        $this->assertNotEmpty($corolla->photos);
        $this->assertIsArray($corolla->key_specifications);
        $this->assertIsArray($corolla->highlights);
        $this->assertIsArray($corolla->equipment_list);
        $this->assertIsArray($corolla->seller);

        // Test frontend compatibility accessors
        $this->assertEquals($corolla->main_image, $corolla->mainImage);
        $this->assertEquals($corolla->daily_price, $corolla->dailyPrice);
        $this->assertEquals($corolla->asking_price, $corolla->askingPrice);
        $this->assertEquals($corolla->key_specifications, $corolla->keySpecifications);
        $this->assertEquals($corolla->equipment_list, $corolla->equipmentList);
    }

    public function test_home_page_loads_with_database_cars_and_brands(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->has('collectionCars')
            ->has('popularBrands')
        );
    }

    public function test_car_details_page_loads_with_car_from_database(): void
    {
        $response = $this->get('/car/toyota-corolla-cross-hybrid-2021');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('CarDetails')
            ->where('slug', 'toyota-corolla-cross-hybrid-2021')
            ->has('car')
            ->where('car.name', '2021 Toyota Corolla Cross hybrid -z 2021')
        );
    }

    public function test_car_details_page_loads_other_seeded_cars(): void
    {
        $slugs = [
            'jaguar-xe-l-p250',
            'audi-r8',
            'bmw-m3',
            'lamborghini-huracan',
        ];

        foreach ($slugs as $slug) {
            $response = $this->get("/car/{$slug}");
            $response->assertStatus(200);
            $response->assertInertia(fn (Assert $page) => $page
                ->component('CarDetails')
                ->where('slug', $slug)
                ->has('car')
            );
        }
    }
}
