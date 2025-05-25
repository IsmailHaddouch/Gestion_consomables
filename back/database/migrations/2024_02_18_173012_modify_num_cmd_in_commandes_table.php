<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyNumCmdInCommandesTable extends Migration
{
       public function up()
    {
        // Supposons que tu n'as pas trop de données critiques,
        // sinon fais un backup avant.

        // Désactiver temporairement les contraintes étrangères (MySQL)
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Supprimer la clé primaire (nécessaire pour modifier la colonne)
        DB::statement('ALTER TABLE commandes DROP PRIMARY KEY;');

        // Modifier la colonne numCmd en auto-increment
        DB::statement('ALTER TABLE commandes MODIFY numCmd INT UNSIGNED NOT NULL AUTO_INCREMENT;');

        // Réaffecter la clé primaire sur numCmd
        DB::statement('ALTER TABLE commandes ADD PRIMARY KEY (numCmd);');

        // Réactiver les contraintes étrangères
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::statement('ALTER TABLE commandes DROP PRIMARY KEY;');

        // Ici tu remets numCmd en INT normal (sans auto_increment)
        DB::statement('ALTER TABLE commandes MODIFY numCmd INT NOT NULL;');

        DB::statement('ALTER TABLE commandes ADD PRIMARY KEY (numCmd);');

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
