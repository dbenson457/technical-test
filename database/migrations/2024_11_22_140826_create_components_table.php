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
        // Create 'components' table with id, name, foreign key to turbines, grade, and timestamps
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('turbine_id')->constrained()->onDelete('cascade');
            $table->integer('grade');
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
        Schema::dropIfExists('components');
    }
};
