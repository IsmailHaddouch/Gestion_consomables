<?php

namespace App\Http\Controllers;
use App\Models\Commander_consomable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Commander_ConsomablesContoller extends Controller
{
    public function index()
    {
        $commandes_consomable =Commander_consomable::all();
        if ($commandes_consomable->count() > 0) {
            $data = [
                'status' => 200,
                'commander_consomables' => $commandes_consomable
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => "Aucune commander consomée "
            ];
            return response()->json($data, 404);
        }
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'numCmd' => 'required|int|exists:commandes,numCmd',
            'ref' => 'required|string|exists:consomables,ref',
            'quantitee_commande' => 'required|int',
           
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        
        $commande_cons = Commander_consomable::create($request->all());
    
        if ( $commande_cons ) {
            return response()->json([
                'status' => 200,
                'message' => 'Commande est deja consomé',
                'commande' =>  $commande_cons 
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Erreur lors de la création de la commande consomé'
            ], 500);
        }
    }
    
    public function edit(Request $request, $Cmd_Cons)
{
    $validator = Validator::make($request->all(), [
        'numCmd' => 'required|int|exists:commandes,numCmd',
        'ref' => 'required|int|exists:consomables,ref',
        'quantitee_commande' => 'required|int',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->messages()
        ], 422);
    }

    $commande_cons = Commander_consomable::findtOrFail($Cmd_Cons);
    $commande_cons->update($request->all());

    return response()->json('Commande consommée mise à jour avec succès');
}

    
public function delete($Cmd_Cons)
{
    $commande = Commander_consomable::findOrFail($Cmd_Cons);

    if (!$commande) {
        return response()->json([
            'status' => 404,
            'message' => 'Commande non trouvée'
        ], 404);
    }

    $commande->delete();

    return response()->json('Commande supprimée avec succès');
}

}