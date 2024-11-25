<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class WindFarmSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 10 wind farms with dummy data
        foreach (range(1, 10) as $index) {
            DB::table('wind_farms')->insert([
                'name' => $faker->company,
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
