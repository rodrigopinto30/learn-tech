<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = ['module_id', 'title', 'content', 'video_url', 'order', 'is_preview'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
