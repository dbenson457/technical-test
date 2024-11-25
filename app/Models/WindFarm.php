<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// The WindFarm model represents a wind farm entity in the database
class WindFarm extends Model {
    // Define a relationship indicating that a wind farm has many turbines
    public function turbines() {
        return $this->hasMany(Turbine::class);
    }
}
