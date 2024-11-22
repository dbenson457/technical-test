<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model {
    public function turbine() {
        return $this->belongsTo(Turbine::class);
    }

    public function grades() {
        return $this->hasMany(Grade::class);
    }
}

