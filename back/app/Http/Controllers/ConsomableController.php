<?php

namespace App\Http\Controllers;
use App\Models\Consomable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class ConsomableController extends Controller
{
    public function index()
    {
        $consomables = Consomable::all();
        if ($consomables->count() > 0) {
            return response()->json([
                'status' => 200,
                'consomables' => $consomables
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aucune consommation trouvée"
            ], 404);
        }
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'réf' => 'required|string',
            'désignation' => 'required|string',
            'quantité_stock' => 'required|integer',
            'untité' => 'required|string',
            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        
        $data = $request->all();
        
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/img', $imageName);
            $data['photo'] = $imageName;
        }
    
        $consomable = Consomable::create($data);
    
        return response()->json([
            'status' => 200,
            'message' => 'Consommation créée avec succès',
            'consomable' => $consomable
        ], 200);
    }
    
    public function edit(Request $request, $réf)
    {
        $validator = Validator::make($request->all(), [
            'réf' => 'required|string',
            'désignation' => 'required|string',
            'quantité_stock' => 'required|integer',
            'untité' => 'required|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $consomable = Consomable::findOrFail($réf);
        $consomable->update($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Consommation mise à jour avec succès',
            'consomable' => $consomable
        ], 200);
    }
    
    public function delete($réf)
    {
        $consomable = Consomable::findOrFail($réf);
        $consomable->delete();
    
        return response()->json([
            'status' => 200,
            'message' => 'Consommation supprimée avec succès'
        ], 200);
    }

    public function showImage($réf)
    {
        $consomable = Consomable::findOrFail($réf);
        $imagePath = storage_path('app/public/img/') . $consomable->photo;

        if (!file_exists($imagePath)) {
            return response()->json(['error' => 'Image not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->file($imagePath);
    }
}