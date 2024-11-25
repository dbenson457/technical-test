<?php

namespace Tests\Feature;

use App\Models\Turbine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TurbineControllerTest extends TestCase {
    use RefreshDatabase;
    use WithFaker;

    public function testGetTurbinesByWindFarm() {
        // Create a wind farm and turbines for testing
        $windFarm = Turbine::factory()->count(3)->create(['wind_farm_id' => 1]);

        // Make a GET request to the turbines by wind farm endpoint
        $response = $this->get('/api/turbines/1');

        // Assert the response status code is 200 (OK)
        $response->assertStatus(200);

        // Assert the response contains the expected turbine data
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'last_inspected',
                'components_needing_attention'
            ]
        ]);
    }

    public function testGetTurbineDetails() {
        // Create a turbine with components and inspections for testing
        $turbine = Turbine::factory()->hasComponents(3)->hasInspections(2)->create();

        // Make a GET request to the turbine details endpoint
        $response = $this->get('/api/turbines/' . $turbine->id);

        // Assert the response status code is 200 (OK)
        $response->assertStatus(200);

        // Assert the response contains the expected turbine details
        $response->assertJsonStructure([
            'id',
            'name',
            'components' => [
                '*' => [
                    'id',
                    'name',
                    'grade'
                ]
            ],
            'inspections' => [
                '*' => [
                    'date',
                    'notes'
                ]
            ]
        ]);
    }

    public function testGetTurbineDetailsNotFound() {
        // Make a GET request to the turbine details endpoint with an invalid turbine ID
        $response = $this->get('/api/turbines/9999');

        // Assert the response status code is 404 (Not Found)
        $response->assertStatus(404);

        // Assert the response contains the expected error message
        $response->assertJson(['error' => 'Turbine not found']);
    }
}