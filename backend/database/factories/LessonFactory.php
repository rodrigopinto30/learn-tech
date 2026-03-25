<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'content' => fake()->paragraphs(3, true),
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'order' => fake()->numberBetween(1, 10),
            'is_preview' => fake()->boolean(20),
        ];
    }
}
