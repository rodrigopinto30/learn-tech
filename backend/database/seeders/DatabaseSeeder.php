<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call(RoleSeeder::class);

        $admin = \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        $user = \App\Models\User::factory()->create([
            'name' => 'Student User',
            'email' => 'student@student.com',
        ]);
        $user->assignRole('student');

        Course::factory(5)->create()->each(function ($course) {

            Module::factory(3)->create(['course_id' => $course->id])->each(function ($module) {

                Lesson::factory(4)->create(['module_id' => $module->id]);
            });
        });
    }
}
