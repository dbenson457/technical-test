<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class InspectionSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 100 inspections, assigning each to a turbine
        foreach (range(1, 100) as $index) {
            DB::table('inspections')->insert([
                'turbine_id' => rand(1, 20),  // Random turbine ID
                'inspection_date' => $faker->dateTimeThisYear,
                'inspection_notes' => $faker->paragraph,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}