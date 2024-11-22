<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turbine extends Model {
    public function windFarm() {
        return $this->belongsTo(WindFarm::class);
    }

    public function components() {
        return $this->hasMany(Component::class);
    }

    public function inspections() {
        return $this->hasMany(Inspection::class);
    }
}

