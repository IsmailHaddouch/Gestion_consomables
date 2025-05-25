<?php

namespace App\Http\Controllers;
use App\Models\LivraisonModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LivraisonController extends Controller
{
    public function index()
    {
        $Livraisons = livraisonModel::with('consomable')->get();
        if ($Livraisons->count() > 0) {
            $data = [
                'status' => 200,
                'livraison' => $Livraisons
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
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'numCmd' => 'required|int|exists:commandes,numCmd',
            'dateLiv' => 'required|date',
            'liv_validee' => 'required|boolean',
            'observation' => 'required|string|max:200'  
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        
        $livraison = LivraisonModel::create($request->all());
    
        if ($livraison) {
            return response()->json([
                'status' => 200,
                'message' => 'Commande créée avec succès',
                'commande' => $livraison
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Erreur lors de la création de la commande'
            ], 500);
        }
    }
    
    public function edit(Request $request, $numLiv)
    {
        $validator = Validator::make($request->all(), [
            'dateLiv' => 'required|date',
            'liv_validee' => 'required|boolean',
            'observation' => 'required|string|max:200'    
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $livraison = LivraisonModel::findOrFail($numLiv);
        $livraison->update($request->all());

        return response()->json('livraison mise à jour avec succès');
    }
    
    public function delete($numLiv)
    {
        $livraison = LivraisonModel::findOrFail($numLiv);
        $livraison->delete();
    
        return response()->json('livraison supprimée avec succès');
    }
}