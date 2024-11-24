<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\WindFarmController;
use App\Http\Controllers\TurbineController;

Route::get('/windfarms', [WindFarmController::class, 'index']); // Fetch all wind farms
Route::get('/windfarm/{id}/turbines', [TurbineController::class, 'getTurbinesByWindFarm']); // Fetch turbines for a wind farm
Route::get('/turbine/{id}', [TurbineController::class, 'getTurbineDetails']); // Fetch details of a specific turbine


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
