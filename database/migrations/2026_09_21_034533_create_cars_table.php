<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->foreignId('car_model_id')->nullable()->constrained('car_models')->nullOnDelete();
            $table->string('brand');
            $table->string('model');
            $table->unsignedSmallInteger('year');
            $table->string('condition');
            $table->string('category')->default('popular');
            $table->string('asking_price');
            $table->string('price_lakh');
            $table->string('daily_price');
            $table->string('rating')->default('5.0');
            $table->string('reviews')->default('0');
            $table->unsignedTinyInteger('passengers')->default(5);
            $table->unsignedTinyInteger('doors')->default(4);
            $table->string('type')->default('Auto');
            $table->boolean('ac')->default(true);
            $table->string('location');
            $table->unsignedInteger('views')->default(0);
            $table->string('published_date');
            $table->string('tag')->nullable();
            $table->string('main_image');
            $table->text('headline')->nullable();
            $table->longText('description')->nullable();
            $table->json('photos')->nullable();
            $table->json('key_specifications')->nullable();
            $table->json('highlights')->nullable();
            $table->json('equipment_list')->nullable();
            $table->json('seller')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['brand', 'model']);
            $table->index('category');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
