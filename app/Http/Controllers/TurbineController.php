<?php
namespace App\Http\Controllers;

use App\Models\Turbine;
use Carbon\Carbon;

class TurbineController extends Controller
{
    public function getTurbinesByWindFarm($windFarmId)
    {
        // Retrieve turbines for the specified wind farm, including their inspections ordered by date
        $turbines = Turbine::where('wind_farm_id', $windFarmId)
            ->with(['inspections' => function ($query) {
                $query->orderBy('inspection_date', 'desc');
            }])
            ->get()
            ->map(function ($turbine) {
                // Get the most recent inspection for the turbine
                $lastInspection = $turbine->inspections->first();
                return [
                    'id' => $turbine->id,
                    'name' => $turbine->name,
                    // Format the last inspection date or indicate if not inspected
                    'last_inspected' => $lastInspection
                        ? Carbon::parse($lastInspection->inspection_date)->format('Y-m-d') 
                        : 'Not inspected',
                    // Calculate components needing attention (grades 4 or 5) out of total components
                    'components_needing_attention' => $turbine->components->count()
                        ? $turbine->components->whereIn('grade', [4, 5])->count() . '/' . $turbine->components->count()
                        : '0/' . $turbine->components->count()
                ];
            });

        // Return the turbines data as a JSON response
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
    
        // Format and return the turbine details as a JSON response
        return response()->json([
            'id' => $turbine->id,
            'name' => $turbine->name,
            // Map each component to include its id, name, and grade (with a fallback if not graded)
            'components' => $turbine->components->map(function ($component) {
                return [
                    'id' => $component->id,
                    'name' => $component->name,
                    'grade' => $component->grade ?? 'Not graded', // Fallback if grade is null
                ];
            }),
            // Map each inspection to include its date (formatted) and notes (with a fallback if not available)
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
