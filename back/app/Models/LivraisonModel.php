<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CommandeModel;
use App\Models\Consomable;


class LivraisonModel extends Model
{
    use HasFactory;
    protected $table= 'livraisons';

      protected $primaryKey = 'numLiv';
    protected $fillable =[
        'numLiv',
        'numCmd',
        'dateLiv',
        'liv_validee',
        'observation',
       
           

    ];
    public function commande()
    {
        return $this->belongsTo(CommandeModel::class, 'numCmd', 'numcmd');
    }
    public function consomable()
    {
        return $this->belongsTo(Consomable::class, 'ref', 'ref');
    }
}
