<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// The WindFarm model represents a wind farm entity in the database
class Inspection extends Model { 
    // Define a relationship indicating that an inspection belongs to a turbine
    public function turbine() { 
        // Establish a many-to-one relationship with Turbine model
        return $this->belongsTo(Turbine::class); 
    }
}

