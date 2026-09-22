<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Dedicated Super Admin Account
        User::updateOrCreate(
            ['email' => 'admin@carbazar.com'],
            [
                'name' => 'CarBazar Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        // Dedicated Seller Demo Account
        User::updateOrCreate(
            ['email' => 'seller@carbazar.com'],
            [
                'name' => 'CarBazar Seller',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'email_verified_at' => now(),
            ]
        );

        // Also ensure test@example.com is an admin if existing
        $testUser = User::where('email', 'test@example.com')->first();
        if ($testUser) {
            $testUser->update([
                'is_admin' => true,
            ]);
        }
    }
}
