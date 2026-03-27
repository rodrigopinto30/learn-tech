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
    public function upload(Request $request, Lesson $lesson)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:204800',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $courseId = $lesson->module->course_id;
            $folder = "courses/{$courseId}/lessons/{$lesson->id}/media";

            $extension = $file->getClientOriginalExtension();
            $nameOnly = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = Str::random(15) . '_' . Str::slug($nameOnly) . '.' . $extension;
            $path = $file->storeAs($folder, $fileName, 'public');

            $url = url('/storage/' . $path);

            return response()->json([
                'success' => true,
                'url' => $url
            ]);
        }

        return response()->json(['success' => false], 400);
    }
}
