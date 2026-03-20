<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Course::factory(5)->create()->each(function ($course) {
            $course->modules()->createMany([
                ['title' => 'Módulo 1: Introducción', 'order' => 1],
                ['title' => 'Módulo 2: Profundización', 'order' => 2],
            ])->each(function ($module) {
                $module->lessons()->createMany([
                    ['title' => 'Lección Inicial', 'order' => 1, 'content' => 'Bienvenida'],
                    ['title' => 'Conceptos Clave', 'order' => 2, 'content' => 'Teoría'],
                ]);
            });
        });
    }
}
