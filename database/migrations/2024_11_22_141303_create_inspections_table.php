<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create 'inspections' table with id, foreign key to turbines, inspection date, and notes
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('turbine_id')->constrained()->onDelete('cascade');
            $table->timestamp('inspection_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->text('inspection_notes')->nullable();
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
        Schema::dropIfExists('inspections');
    }
};
