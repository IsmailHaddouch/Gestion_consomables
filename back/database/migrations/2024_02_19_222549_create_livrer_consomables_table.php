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
Schema::create('livrer_consomables', function (Blueprint $table) {
    $table->integer('Livr_Cons')->primary();
    $table->unsignedBigInteger('numLiv'); // Correspond au type de livraisons.numLiv
    $table->unsignedBigInteger('réf');    // Correspond au type de consomables.réf
    $table->foreign('numLiv')->references('numLiv')->on('livraisons');
    $table->foreign('réf')->references('réf')->on('consomables');
    $table->integer('quantité_liv');
    $table->integer('quantité_consomée');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livrer_consomables');
    }
};
