<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AssignmentSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::first();

        if ($course) {
            Assignment::create([
                'course_id' => $course->id,
                'title' => 'First Project: Component Architecture',
                'description' => 'Create a reusable sidebar component using React and Tailwind CSS.',
                'due_date' => Carbon::now()->addDays(5),
            ]);

            Assignment::create([
                'course_id' => $course->id,
                'title' => 'Final Exam: State Management',
                'description' => 'Implement a global store using Zustand with persistence.',
                'due_date' => Carbon::now()->subDays(2),
            ]);
        }
    }
}
