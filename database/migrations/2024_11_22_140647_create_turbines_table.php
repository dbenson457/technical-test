<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create 'turbines' table with id, name, foreign key to wind_farms, and timestamps
        Schema::create('turbines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('wind_farm_id')->constrained()->onDelete('cascade');
            $table->timestamp('last_inspection')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turbines');
    }
};
