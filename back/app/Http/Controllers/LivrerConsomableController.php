<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Livrer_consomable;
use Illuminate\Support\Facades\Validator;

class LivrerConsomableController extends Controller
{
   public function index()
   {
        $Livrers_Cons = Livrer_consomable::with('consomable')->get();
        if ($Livrers_Cons->count() > 0) {
            return response()->json(['Livrer_Cons'=> $Livrers_Cons ],200);
        } else {
            $data = [
                'status' => 404,
                'message' => "Aucun Livrer_consomable trouvé"
            ];
            return response()->json($data, 404);
        }
   }

   public function store(Request $request)
   {
        $validator = Validator::make($request->all(), [
            'quantite_Liv' => 'required|string|max:20',
            'quantite_Consomee' => 'required|string|max:20',
          
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $Livrer_Cons = Livrer_consomable::create($request->all());

        if ($Livrer_Cons) {
            return response()->json([
                'status' => 200,
                'message' => 'Personnel créé avec succès',
                'Livrer_Consomable' => $Livrer_Cons
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Erreur lors de la création du personnel'
            ], 500);
        }
   }

   public function edit(Request $request, $Livr_Cons)
   {
    $validator = Validator::make($request->all(), [
        'Cmd_Cons' => 'required|int',
        'quantite_Liv' => 'required|string|max:20',
        'quantité_Consomée' => 'required|string|max:20',
      
    ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $personnel = Livrer_consomable::findOrFail( $Livr_Cons);
        $personnel->update($request->all());

        return response()->json('Livrer_consomables mis à jour avec succès');
   }

   public function delete( $Livr_Cons)
   {
        $personnel = Livrer_consomable::findOrFail($ $Livr_Cons);
        $personnel->delete();

        return response()->json('Livrer_consomable supprimé avec succès');
   }
}