<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Course;
use App\Http\Controllers\Controller;


class ModuleController extends Controller
{
    public function store(Request $request, Course $course): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $order = $course->modules()->count() + 1;

        $module = $course->modules()->create([
            'title' => $validated['title'],
            'order' => $order
        ]);

        return response()->json([
            'success' => true,
            'data' => $module->load('lessons')
        ]);
    }
}
