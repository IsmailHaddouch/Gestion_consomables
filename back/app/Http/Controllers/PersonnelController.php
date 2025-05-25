<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PersonnelModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PersonnelController extends Controller
{
   public function index()
   {
        $personnels = PersonnelModel::all();
        if ($personnels->count() > 0) {
            $data = [
                'status' => 200,
                'personnels' => $personnels
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'status' => 404,
                'message' => "Aucun personnel trouvé"
            ];
            return response()->json($data, 404);
        }
   }

   public function store(Request $request)
   {
       $validator = Validator::make($request->all(), [
           'matricul' => 'required|int',
           'nom' => 'required|string|max:20',
           'prenom' => 'required|string|max:20',
           'statut' => 'required|string|max:20',
           'secteur' => 'required|string|max:20',
           'fonction' => 'required|string|max:20',
           'motDePass' => 'required|string|max:20',
       ]);
   
       if ($validator->fails()) {
           return response()->json([
               'status' => 422,
               'errors' => $validator->messages()
           ], 422);
       }
   
       $data = $request->all();

       // Stockage en clair, pas de hash
       // $data['motDePass'] = Hash::make($request->input('motDePass'));
   
       $personnel = PersonnelModel::create($data);
   
       if ($personnel) {
           return response()->json([
               'status' => 200,
               'message' => 'Personnel créé avec succès',
               'personnel' => $personnel
           ], 200);
       } else {
           return response()->json([
               'status' => 500,
               'message' => 'Erreur lors de la création du personnel'
           ], 500);
       }
   }
   
   public function edit(Request $request, $matricul)
   {
       $validator = Validator::make($request->all(), [
           'nom' => 'required|string|max:20',
           'prenom' => 'required|string|max:20',
           'statut' => 'required|string|max:20',
           'secteur' => 'required|string|max:20',
           'fonction' => 'required|string|max:20',
           // 'motDePass' => 'required|string|max:20', // optionnel
       ]);
   
       if ($validator->fails()) {
           return response()->json([
               'status' => 422,
               'errors' => $validator->messages()
           ], 422);
       }
   
       $data = $request->all();

       // Ne pas hasher motDePass, le stocker en clair si modifié
       /*
       if (!empty($data['motDePass'])) {
           // rien à faire, motDePass en clair
       } else {
           unset($data['motDePass']);
       }
       */
   
       $personnel = PersonnelModel::findOrFail($matricul);
       $personnel->update($data);
   
       return response()->json('Personnel mis à jour avec succès');
   }
   
   public function delete($matricul)
   {
        $personnel = PersonnelModel::findOrFail($matricul);
        $personnel->delete();

        return response()->json('Personnel supprimé avec succès');
   }

   public function login(Request $request)
   {
       $credentials = $request->only('matricul', 'motDePass');
   
       $personnel = PersonnelModel::where('matricul', $credentials['matricul'])->first();
   
       // Comparaison simple motDePass en clair
       if (!$personnel || $credentials['motDePass'] !== $personnel->motDePass) {
           return response()->json(['message' => 'Identifiants incorrects'], 401);
       }
   
       // Auth::login($personnel); // Optionnel si tu utilises Laravel Auth
   
       return response()->json([
           'message' => 'Connexion réussie',
           "function" => $personnel->fonction,
           "matricul" => $personnel->matricul
       ]);
   }
}
