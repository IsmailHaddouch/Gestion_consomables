<?php

namespace App\Http\Controllers;
use App\Models\CommandeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommandeController extends Controller
{
    public function index()
    {
        $commandes = CommandeModel::all();
        if ($commandes->count() > 0) {
            $data = [
                'status' => 200,
                'commandes' => $commandes
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => "Aucune commande trouvée"
            ];
            return response()->json($data, 404);
        }
    }

    public function index2($matricul)
{
    // Retrieve commands based on the provided matricul
    $commandes = CommandeModel::where('matricul', $matricul)->get();

    if ($commandes->count() > 0) {
        $data = [
            'status' => 200,
            'commandes' => $commandes
        ];
        return response()->json($data, 200);
    } else {
        $data = [
            'status' => 404,
            'message' => "Aucune commande trouvée pour le matricul $matricul"
        ];
        return response()->json($data, 404);
    }
}
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'matricul' => 'required|int|exists:personnels,matricul',
            'date_cmd' => 'required|date',
            'anneeFormation' => 'required|integer',
            'observation' => 'required|string|max:200', 
            'validee'=>'required|boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        
        $commande = CommandeModel::create($request->all());
    
        if ($commande) {
            return response()->json([
                'status' => 200,
                'message' => 'Commande créée avec succès',
                'commande' => $commande
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Erreur lors de la création de la commande'
            ], 500);
        }
    }
    
    public function edit(Request $request, $numCmd)
    {
        $validator = Validator::make($request->all(), [
            'date_cmd' => 'required|date',
            'validee' => 'required|boolean',
            'anneeFormation' => 'required|integer',
            'observation' => 'required|string|max:200'  
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $commande = CommandeModel::findOrFail($numCmd);
        $commande->update($request->all());

        return response()->json('Commande mise à jour avec succès');
    }
    
    public function delete($numCmd)
    {
        $commande = CommandeModel::findOrFail($numCmd);
        $commande->delete();
    
        return response()->json('Commande supprimée avec succès');
    }
}