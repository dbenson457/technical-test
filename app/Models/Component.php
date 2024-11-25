<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// The Component model represents a component entity in the database
class Component extends Model {
    // Define a relationship indicating that a component belongs to a turbine
    public function turbine() {
        return $this->belongsTo(Turbine::class);
    }
}