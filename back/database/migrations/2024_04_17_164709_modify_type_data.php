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
        Schema::table('personnels', function (Blueprint $table) {
            // Supprimer les colonnes existantes
            $table->dropColumn('statut');
            $table->dropColumn('fonction');
        });

        Schema::table('personnels', function (Blueprint $table) {
            // Ajouter les nouvelles colonnes ENUM
            $table->enum('statut', ['vacataire', 'contractuel', 'statutaire', 'coopérant'])->after('prenom')->nullable(); 
            $table->enum('fonction', ['magasinier', 'formateur', 'directeur', 'directeur complexe'])->after('statut')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personnels', function (Blueprint $table) {
            // Revenir en arrière en cas de rollback
            $table->dropColumn('statut');
            $table->dropColumn('fonction');
        });
    }
};

