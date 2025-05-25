<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->integer('numCmd')->primary();
            $table->integer('matricul');
            $table->foreign('matricul')->references('matricul')->on('personnels');
            $table->date('date_cmd');
            $table->boolean('validée');
            $table->integer('annéeFormation');
            $table->string('observation', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
