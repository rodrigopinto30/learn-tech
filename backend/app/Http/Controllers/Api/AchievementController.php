<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $allAchievements = Achievement::all();
        $unlockedIds = $user->achievements()->pluck('achievement_id')->toArray();

        $data = $allAchievements->map(function ($achievement) use ($unlockedIds) {
            return [
                'id' => $achievement->id,
                'title' => $achievement->title,
                'description' => $achievement->description,
                'icon' => $achievement->icon,
                'color' => $achievement->color,
                'unlocked' => in_array($achievement->id, $unlockedIds),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
