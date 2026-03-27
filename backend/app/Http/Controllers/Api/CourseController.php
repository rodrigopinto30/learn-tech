<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::with('modules')->get();
        return response()->json([
            'success' => true,
            'data' => $courses
        ]);
    }

    public function show(Course $course)
    {
        $course->load('modules.lessons');
        return response()->json(['success' => true, 'data' => $course]);
    }

    public function adminShow(Course $course): JsonResponse
    {
        $course->load(['modules.lessons']);

        return response()->json([
            'success' => true,
            'data' => $course
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:draft,published',
            'thumbnail' => 'nullable|string'
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        $course = Course::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully',
            'data' => $course
        ], 201);
    }

    public function update(Request $request, Course $course): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:draft,published',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $course->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . time();
        }

        $course->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $course
        ]);
    }

    public function destroy(Course $course): JsonResponse
    {
        $course->delete();
        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }

    public function adminIndex(): JsonResponse
    {
        $courses = Course::withCount('students')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $courses
        ]);
    }
}
