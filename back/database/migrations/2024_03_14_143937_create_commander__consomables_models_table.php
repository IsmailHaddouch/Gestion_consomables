<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commander_consomables', function (Blueprint $table) {
            
            $table->integer('Cmd_Cons')->primary();
            // Déclaration des clés étrangères
            $table->foreign('numCmd')->references('numCmd')->on('commandes');
            $table->foreign('réf')->references('réf')->on('consomables');
            $table ->string('quantité_commandé');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commander_consomables');
    }
};
