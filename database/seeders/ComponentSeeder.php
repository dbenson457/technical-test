<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Turbine;
use App\Models\Component;
use Faker\Factory as Faker;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define the specific components each turbine should have
        $componentNames = ['Blade', 'Rotor', 'Hub', 'Generator'];

        // Create a Faker instance to generate random data
        $faker = Faker::create();

        // Loop through all turbines
        Turbine::all()->each(function ($turbine) use ($componentNames, $faker) {
            foreach ($componentNames as $name) {
                // Create a component for the turbine with the given name and random grade
                Component::create([
                    'name' => $name,
                    'turbine_id' => $turbine->id,
                    'grade' => $faker->numberBetween(1, 5), // Random grade between 1 and 5
                ]);
            }
        });
    }
}