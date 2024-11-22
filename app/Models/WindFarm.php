<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WindFarm extends Model {
    public function turbines() {
        return $this->hasMany(Turbine::class);
    }
}
