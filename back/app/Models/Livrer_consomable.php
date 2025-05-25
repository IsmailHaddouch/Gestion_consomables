<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livrer_consomable extends Model
{
    use HasFactory;
    protected $table = 'Livrer_Consomables';

    protected $primaryKey = 'Livr_Cons';
    protected $fillable = [
        'numLiv',
        'ref',
        'quantitee_Consomee',
        'quantitee_Liv'

    ];
    public function livraison()
    {
        return $this->belongsTo(CommandeModel::class, 'numLiv', 'numLiv');
    }
    public function consomable()
    {
        return $this->belongsTo(Consomable::class, 'ref', 'ref');
    }


}
