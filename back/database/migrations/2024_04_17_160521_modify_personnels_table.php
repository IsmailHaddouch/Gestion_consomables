<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('personnels', function (Blueprint $table) {
            $table->string('motDePass', 255)->change();
        });
    }
    
    public function down()
    {
        Schema::table('personnels', function (Blueprint $table) {
            $table->string('motDePass')->change();
        });
    }
};
