<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PersonnelModel;

class CommandeModel extends Model
{
    use HasFactory;
    protected $table= 'commandes';

      protected $primaryKey = 'numCmd';
    protected $fillable =[
        'numCmd',
        'matricul',
        'date_cmd',
        'validee',
        'anneeFormation',
        'observation',
       
       
           

    ];
    public function personnel()
    {
        return $this->belongsTo(PersonnelModel::class, 'matricul', 'matricul');
    }

}