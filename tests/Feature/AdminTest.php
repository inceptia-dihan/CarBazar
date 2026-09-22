<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_guests_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/admin/dashboard');

        $response->assertRedirect('/admin/login');
    }

    public function test_sellers_cannot_access_admin_dashboard(): void
    {
        $seller = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($seller)->get('/admin/dashboard');

        $response->assertStatus(403);
    }

    public function test_admins_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($admin)->get('/admin/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Dashboard')
            ->has('stats')
            ->has('listings')
            ->has('users')
            ->has('brands')
        );
    }

    public function test_admin_can_login_via_admin_login(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password123'),
            'is_admin' => true,
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'admin@test.com',
            'password' => 'password123',
        ]);

        $this->assertAuthenticatedAs($admin);
        $response->assertRedirect('/admin/dashboard');
    }

    public function test_seller_cannot_login_via_admin_login(): void
    {
        User::factory()->create([
            'email' => 'seller@test.com',
            'password' => bcrypt('password123'),
            'is_admin' => false,
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'seller@test.com',
            'password' => 'password123',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('email');
    }

    public function test_admin_can_toggle_featured_listing(): void
    {
        $admin = User::where('is_admin', true)->first();
        $car = Car::first();
        $originalStatus = (bool) $car->is_featured;

        $response = $this->actingAs($admin)->patch("/admin/listings/{$car->id}/toggle-featured");

        $response->assertSessionHas('success');
        $this->assertEquals(! $originalStatus, (bool) $car->fresh()->is_featured);
    }

    public function test_admin_can_toggle_user_admin_status(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $seller = User::factory()->create(['is_admin' => false]);

        $response = $this->actingAs($admin)->patch("/admin/users/{$seller->id}/toggle-admin");

        $response->assertSessionHas('success');
        $this->assertTrue($seller->fresh()->is_admin);
    }

    public function test_admin_cannot_demote_themselves(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->patch("/admin/users/{$admin->id}/toggle-admin");

        $response->assertSessionHas('error');
        $this->assertTrue($admin->fresh()->is_admin);
    }
}
