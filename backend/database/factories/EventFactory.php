<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start_date = Carbon::now()->format('Y-m-d');
        $end_date = Carbon::parse($start_date)->addDays(rand(1, 30))->format('Y-m-d');

        return [
            'name' => $this->faker->title,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'status' => true,
        ];
    }
}
