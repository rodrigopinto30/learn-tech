<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'description', 'thumbnail', 'price', 'status'];

    public function modules()
    {
        return $this->hasMany(Module::class)->orderBy('order');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments');
    }
}
