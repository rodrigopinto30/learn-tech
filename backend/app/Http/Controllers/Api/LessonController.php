<?php

namespace App\Http\Controllers\Api;

use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class LessonController extends Controller
{
    public function store(Request $request, Module $module): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $lastOrder = $module->lessons()->max('order') ?? 0;

        $lesson = $module->lessons()->create([
            'title' => $request->title,
            'order' => $lastOrder + 1,
            'is_preview' => false,
        ]);

        return response()->json([
            'success' => true,
            'data' => $lesson
        ], 201);
    }

    public function update(Request $request, Lesson $lesson): JsonResponse
    {
        $lesson->update($request->only('title', 'is_preview', 'order'));
        return response()->json(['success' => true, 'data' => $lesson]);
    }

    public function destroy(Lesson $lesson): JsonResponse
    {
        $lesson->delete();
        return response()->json(['success' => true]);
    }
}
