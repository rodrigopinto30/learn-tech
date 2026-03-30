<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonProgressController extends Controller
{

    public function toggle(Request $request, Lesson $lesson)
    {
        $user = $request->user();
        $status = $user->completedLessons()->toggle($lesson->id);
        $isCompleted = count($status['attached']) > 0;

        return response()->json([
            'success' => true,
            'completed' => $isCompleted
        ]);
    }
}
