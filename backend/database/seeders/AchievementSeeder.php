<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Achievement;

class AchievementSeeder extends Seeder
{

    public function run(): void
    {
        $achievements = [
            [
                'title' => 'First Step',
                'description' => 'Completaste tu primera lección.',
                'icon' => 'Zap',
                'color' => 'text-amber-500',
                'requirement_type' => 'lessons',
                'requirement_count' => 1
            ],
            [
                'title' => 'Responsible Student',
                'description' => 'Entregaste tu primera tarea del curso.',
                'icon' => 'ClipboardCheck',
                'color' => 'text-blue-500',
                'requirement_type' => 'assignments',
                'requirement_count' => 1
            ],
            [
                'title' => 'Course Master',
                'description' => 'Completaste todas las lecciones de un curso.',
                'icon' => 'Trophy',
                'color' => 'text-emerald-500',
                'requirement_type' => 'course_completion',
                'requirement_count' => 1
            ],
        ];

        foreach ($achievements as $data) {
            \App\Models\Achievement::create($data);
        }
    }
}
