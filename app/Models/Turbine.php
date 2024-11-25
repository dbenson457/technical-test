<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// The Turbine model represents a wind turbine entity in the database
class Turbine extends Model {
    // Define a relationship indicating that a turbine belongs to a wind farm
    public function windFarm() {
        return $this->belongsTo(WindFarm::class);
    }

    // Define a relationship indicating that a turbine has many components
    public function components() {
        return $this->hasMany(Component::class);
    }

    // Define a relationship indicating that a turbine has many inspections
    public function inspections() {
        return $this->hasMany(Inspection::class);
    }
}

