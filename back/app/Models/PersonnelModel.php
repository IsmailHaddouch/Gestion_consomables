<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Contracts\Auth\Authenticatable;

class PersonnelModel extends Model implements Authenticatable
{
    use HasFactory, AuthenticatableTrait;

    protected $table = 'personnels';
    protected $primaryKey = 'matricul';
    public $incrementing = false;

    protected $fillable = [
        'matricul',
        'nom',
        'prenom',
        'statut',
        'fonction',
        'secteur',
        'motDePass'
    ];

    protected $hidden = [
        'motDePass'
    ];
}


