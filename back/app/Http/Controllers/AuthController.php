<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        // Valider les données du formulaire
        $credentials = $request->validate([
            'matricul' => 'required|matricul',
            'password' => 'required',
        ]);



}
}
