<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $assignments = Assignment::with(['course:id,title', 'submissions' => function ($q) use ($user) {
            $q->where('user_id', $user->id);
        }])->get();

        return response()->json([
            'success' => true,
            'data' => $assignments
        ]);
    }
    public function submit(Request $request, Assignment $assignment): JsonResponse
    {
        $user = $request->user();

        $request->validate([
            'content_link' => 'required|url',
        ]);

        $submission = AssignmentSubmission::updateOrCreate(
            ['assignment_id' => $assignment->id, 'user_id' => $user->id],
            [
                'content_link' => $request->content_link,
                'status' => 'submitted'
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Assignment submitted successfully',
            'data' => $submission
        ]);
    }
}
