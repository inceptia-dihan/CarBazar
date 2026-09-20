# CarBazar

A modern car marketplace and rental web platform built with Laravel 12, Inertia.js, React, and Tailwind CSS.

## Features

- **Car Filter & Search**: Search and filter by Brand, Model, Price Range (in Bangladeshi Taka ৳), and Condition (New / Used) with responsive drop-up selects.
- **Dynamic Vehicle Catalog**: Comprehensive car inventory with high-resolution imagery, specifications, fuel efficiency, and price details.
- **Dedicated Car Details Page**: Detailed overview showcasing multi-angle image galleries, key vehicle features, and direct inquiry/booking flows.
- **Responsive & Modern UI**: Sleek, high-converting layout styled with Tailwind CSS, clean SVG iconography, and interactive hover states.

## Tech Stack

- **Backend**: Laravel 12, PHP 8.4
- **Frontend**: React 19, Inertia.js v2, Tailwind CSS v3
- **Bundler**: Vite

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/inceptia-dihan/CarBazar.git
   cd CarBazar
   ```

2. **Install PHP and Node dependencies**:
   ```bash
   composer install
   npm install
   ```

3. **Configure Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   php artisan serve
   ```
