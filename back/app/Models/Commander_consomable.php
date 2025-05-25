<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CommandeModel;
use App\Models\consomable;

class Commander_consomable extends Model
{
    use HasFactory;
    
    protected $table = 'cmd_cons';



    protected $fillable = [
   
        'numCmd',
        'ref',
        'quantitee_commande'
    ];

    public function commande()
    {
        return $this->belongsTo(CommandeModel::class, 'numCmd', 'numCmd');
    }

    public function consomable()
    {
        return $this->belongsTo(Consomable::class, 'ref', 'ref');
    }
}
