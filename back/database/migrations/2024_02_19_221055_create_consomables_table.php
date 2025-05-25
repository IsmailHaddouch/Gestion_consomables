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
        Schema::create('consomables', function (Blueprint $table) {
            $table->string('réf')->primary();
            $table->string("désignation",30);
            $table->integer("quantité_stock");
            $table->string("untité",30);
            $table->string("photo",256);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consomables');
       

        
    }
};
