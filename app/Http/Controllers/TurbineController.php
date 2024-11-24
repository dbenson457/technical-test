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
        $turbine = Turbine::with(['components', 'inspections'])->findOrFail($turbineId);

        return response()->json([
            'id' => $turbine->id,
            'name' => $turbine->name,
            'components' => $turbine->components->map(function ($component) {
                return [
                    'name' => $component->name,
                    'grade' => $component->grade,
                    'notes' => $component->notes
                ];
            }),
            'inspections' => $turbine->inspections->map(function ($inspection) {
                return [
                    'date' => $inspection->inspection_date->format('Y-m-d'),
                    'notes' => $inspection->inspection_notes
                ];
            })
        ]);
    }
}
