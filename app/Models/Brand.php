<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'popular',
    ];

    protected $casts = [
        'popular' => 'boolean',
    ];

    public function models(): HasMany
    {
        return $this->hasMany(CarModel::class, 'brand_id');
    }

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'brand_id');
    }
}
