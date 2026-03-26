<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ModuleController;
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

// Rutas Publicas
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);

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
});
