<?php
namespace App\Http\Controllers;

use App\Models\Turbine;
use Carbon\Carbon;

class TurbineController extends Controller
{
    public function getTurbinesByWindFarm($windFarmId)
    {
        $turbines = Turbine::where('wind_farm_id', $windFarmId)
            ->with(['inspections' => function ($query) {
                $query->orderBy('inspection_date', 'desc');
            }])
            ->get()
            ->map(function ($turbine) {
                $lastInspection = $turbine->inspections->first();
                return [
                    'id' => $turbine->id,
                    'name' => $turbine->name,
                    'last_inspected' => $lastInspection
                        ? Carbon::parse($lastInspection->inspection_date)->format('Y-m-d') 
                        : 'Not inspected',
                    'components_needing_attention' => $turbine->components->count()
                        ? $turbine->components->whereIn('grade', [4, 5])->count() . '/' . $turbine->components->count()
                        : '0/' . $turbine->components->count()
                ];
            });

        return response()->json($turbines);
    }

    public function getTurbineDetails($turbineId)
    {
        // Fetch the turbine with related components and inspections
        $turbine = Turbine::with(['components', 'inspections'])->find($turbineId);
    
        // Return a 404 error if the turbine is not found
        if (!$turbine) {
            return response()->json(['error' => 'Turbine not found'], 404);
        }
    
        // Format and return the response
        return response()->json([
            'id' => $turbine->id,
            'name' => $turbine->name,
            'components' => $turbine->components->map(function ($component) {
                return [
                    'id' => $component->id,
                    'name' => $component->name,
                    'grade' => $component->grade ?? 'Not graded', // Fallback if grade is null
                ];
            }),
            'inspections' => $turbine->inspections->map(function ($inspection) {
                return [
                    'date' => $inspection->inspection_date 
                        ? Carbon::parse($inspection->inspection_date)->format('Y-m-d')
                        : 'Not inspected',
                    'notes' => $inspection->inspection_notes ?? 'No notes available', // Fallback for missing notes
                ];
            }),
        ]);
    }    
}
