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
        Schema::create('personnels', function (Blueprint $table) {
            $table->integer('matricul')->primary();
            $table->string("nom",20);
            $table->string("prenom",20);
            $table->string("statut",50);
            $table->string("secteur",50);
            $table->string("fonction",50);
            $table->string("motDePass",30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnel_models');
    }
};
