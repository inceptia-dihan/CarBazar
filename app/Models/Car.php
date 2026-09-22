<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'name',
        'brand_id',
        'car_model_id',
        'brand',
        'model',
        'year',
        'condition',
        'category',
        'asking_price',
        'price_lakh',
        'daily_price',
        'rating',
        'reviews',
        'passengers',
        'doors',
        'type',
        'ac',
        'location',
        'views',
        'published_date',
        'tag',
        'main_image',
        'headline',
        'description',
        'photos',
        'key_specifications',
        'highlights',
        'equipment_list',
        'seller',
        'is_featured',
    ];

    protected $casts = [
        'year' => 'integer',
        'passengers' => 'integer',
        'doors' => 'integer',
        'views' => 'integer',
        'ac' => 'boolean',
        'is_featured' => 'boolean',
        'photos' => 'array',
        'key_specifications' => 'array',
        'highlights' => 'array',
        'equipment_list' => 'array',
        'seller' => 'array',
    ];

    protected $appends = [
        'askingPrice',
        'priceLakh',
        'dailyPrice',
        'price',
        'publishedDate',
        'mainImage',
        'image',
        'keySpecifications',
        'equipmentList',
        'bodyType',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function brandRelation(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function carModelRelation(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }

    public function getAskingPriceAttribute(): ?string
    {
        return $this->attributes['asking_price'] ?? null;
    }

    public function getPriceLakhAttribute(): ?string
    {
        return $this->attributes['price_lakh'] ?? null;
    }

    public function getDailyPriceAttribute(): ?string
    {
        return $this->attributes['daily_price'] ?? null;
    }

    public function getPriceAttribute(): ?string
    {
        return $this->attributes['daily_price'] ?? null;
    }

    public function getPublishedDateAttribute(): ?string
    {
        return $this->attributes['published_date'] ?? null;
    }

    public function getMainImageAttribute(): ?string
    {
        return $this->attributes['main_image'] ?? null;
    }

    public function getImageAttribute(): ?string
    {
        return $this->attributes['main_image'] ?? null;
    }

    public function getKeySpecificationsAttribute(): ?array
    {
        $val = $this->attributes['key_specifications'] ?? null;
        if (is_array($val)) {
            return $val;
        }

        return $val ? $this->fromJson($val) : [];
    }

    public function getEquipmentListAttribute(): ?array
    {
        $val = $this->attributes['equipment_list'] ?? null;
        if (is_array($val)) {
            return $val;
        }

        return $val ? $this->fromJson($val) : [];
    }

    public function getBodyTypeAttribute(): ?string
    {
        $specs = $this->key_specifications;
        if (is_array($specs)) {
            foreach ($specs as $spec) {
                if (isset($spec['label']) && strtolower($spec['label']) === 'body type') {
                    return $spec['value'];
                }
            }
        }

        return null;
    }
}
