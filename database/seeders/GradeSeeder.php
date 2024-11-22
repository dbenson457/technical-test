<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class GradeSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 50 grades, assigning each to a component
        foreach (range(1, 50) as $index) {
            DB::table('grades')->insert([
                'component_id' => rand(1, 30),  // Random component ID
                'grade' => rand(1, 5),  // Random grade between 1 and 5
                'notes' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}