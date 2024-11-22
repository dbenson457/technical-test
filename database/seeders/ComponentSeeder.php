<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Turbine;
use App\Models\Component;

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

        // Loop through all turbines
        Turbine::all()->each(function ($turbine) use ($componentNames) {
            foreach ($componentNames as $name) {
                // Create a component for the turbine with the given name
                Component::create([
                    'name' => $name,
                    'turbine_id' => $turbine->id,
                ]);
            }
        });
    }
}