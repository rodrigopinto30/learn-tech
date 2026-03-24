<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response()->json(['message' => 'LearnTech API is live!']);
});

// Rutas publicas (para estudiantes o visitantes)
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);

// Rutas protegidas para Admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/admin/courses', [CourseController::class, 'store']);
    Route::put('/admin/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/admin/courses/{course}', [CourseController::class, 'destroy']);
    Route::get('/admin/courses', [CourseController::class, 'indexAdmin']);
});
