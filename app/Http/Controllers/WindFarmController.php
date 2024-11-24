<?php

namespace App\Http\Controllers;

use App\Models\WindFarm;

class WindFarmController extends Controller
{
    public function index()
    {
        $windFarms = WindFarm::all();
        return response()->json($windFarms);
    }
}