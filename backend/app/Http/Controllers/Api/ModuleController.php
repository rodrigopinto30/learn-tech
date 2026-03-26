<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Course;
use App\Http\Controllers\Controller;
use App\Models\Module;

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

    public function update(Request $request, Module $module): JsonResponse
    {
        $validated = $request->validate(['title' => 'required|string|max:255']);
        $module->update($validated);
        return response()->json(['success' => true, 'data' => $module]);
    }

    public function destroy(Module $module): JsonResponse
    {
        $module->delete();
        return response()->json(['success' => true]);
    }
}
