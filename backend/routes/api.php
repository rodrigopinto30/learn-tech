<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\LessonProgressController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\ModuleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response()->json(['message' => 'LearnTech API is live!']);
});

// Rutas Publicas
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);

Route::get('/storage/{path}', function ($path) {
    $path = str_replace('../', '', $path);
    $fullPath = "public/" . $path;
    if (!Storage::exists($fullPath)) abort(404);
    $file = Storage::get($fullPath);
    $type = Storage::mimeType($fullPath);
    return Response::make($file, 200)->header("Content-Type", $type);
})->where('path', '.*');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/my-courses', [CourseController::class, 'index']);

    Route::get('/learn/courses/{course:id}', [CourseController::class, 'show']);

    Route::post('/lessons/{lesson}/toggle-complete', [LessonProgressController::class, 'toggle']);
});

// Rutas Protegidas (Solo Admin)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/admin/courses/{course:id}', [CourseController::class, 'adminShow']);
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course:id}', [CourseController::class, 'destroy']);
    Route::get('/admin/courses-list', [CourseController::class, 'adminIndex']);
    Route::post('/courses/{course}/modules', [ModuleController::class, 'store']);

    Route::put('/modules/{module}', [ModuleController::class, 'update']);
    Route::delete('/modules/{module}', [ModuleController::class, 'destroy']);

    Route::post('/modules/{module}/lessons', [LessonController::class, 'store']);
    Route::put('/lessons/{lesson}', [LessonController::class, 'update']);
    Route::delete('/lessons/{lesson}', [LessonController::class, 'destroy']);
    Route::post('/lessons/{lesson}/media', [MediaController::class, 'upload']);
});
