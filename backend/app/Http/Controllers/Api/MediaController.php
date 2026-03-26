<?php

namespace App\Http\Controllers\Api;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    public function upload(Request $request, Lesson $lesson): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:102400',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $type = $file->getMimeType();
            $isVideo = Str::startsWith($type, 'video/');

            $courseId = $lesson->module->course_id;
            $path = "courses/{$courseId}/lessons/{$lesson->id}/media";

            $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();
            $storedPath = $file->storeAs($path, $fileName, 'public');

            $url = asset('storage/' . $storedPath);

            return response()->json([
                'success' => true,
                'url' => $url,
                'type' => $isVideo ? 'video' : 'image',
                'name' => $file->getClientOriginalName()
            ]);
        }

        return response()->json(['success' => false, 'message' => 'File not found'], 400);
    }
}
