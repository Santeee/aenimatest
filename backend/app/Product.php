<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Product extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = [
        'name',
        'description'
    ];

    protected $appends = [
        'url_image'
    ];

    protected $hidden = [
        'media',
        'created_at',
        'updated_at'
    ];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('image')
            ->singleFile();
    }

    public function getUrlImageAttribute()
    {
        $media = $this->getFirstMedia('image');
        return $media->getFullUrl();
    }
}
