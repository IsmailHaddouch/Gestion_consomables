<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consomable extends Model
{
    use HasFactory;
    protected $table= 'consomables';
    protected $primaryKey = 'réf';
    public $incrementing = false;

    protected $fillable =[
    'réf',
    'désignation',
    'quantité_stock',
    'untité',
    'photo'
    
    ];
 


}
