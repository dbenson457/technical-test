<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TurbineSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 20 turbines, assigning each to a wind farm
        foreach (range(1, 20) as $index) {
            DB::table('turbines')->insert([
                'name' => $faker->word,
                'wind_farm_id' => rand(1, 10),  // Random wind farm ID
                'last_inspection' => $faker->dateTimeThisYear,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
