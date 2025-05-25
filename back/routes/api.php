<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ConsomableController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\Commander_ConsomablesContoller;
use App\Http\Controllers\LivrerConsomableController;
use App\Http\Controllers\AuthController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//route personels

Route::get('personnel',[PersonnelController::class, "index"]);
Route::post('personnel-create',[PersonnelController::class, "store"]);
Route::PUT('personnel-edit/{matricul}',[PersonnelController::class, "edit"]);
Route::delete('personnel-delete/{matricul}',[PersonnelController::class, "delete"]);
Route::post('personnel-login', [PersonnelController::class, "login"]);
Route::post('personnel-logout', [PersonnelController::class, "logout"]);

//route crud commande
Route::get('commandes',[CommandeController::class, "index"]);
Route::get('commandes/{matricul}', 'App\Http\Controllers\CommandeController@index2');
Route::post('commande-create',[CommandeController::class, "store"]);
Route::PUT('commande-edit/{numCmd}',[CommandeController::class, "edit"]);
Route::delete('commande-delete/{numCmd}',[CommandeController::class, "delete"]);

//route livraison:
Route::get('livraison',[LivraisonController::class, "index"]);
Route::post('livraison-create',[LivraisonController::class, "store"]);
Route::PUT('livrasion-edit/{numLiv}',[LivraisonController::class, "edit"]);
Route::delete('livraison-delete/{numLiv}',[LivraisonController::class, "delete"]);

//route consomable:
Route::get('consomable',[ConsomableController::class, "index"]);
Route::post('consomable-create',[ConsomableController::class, "store"]);
Route::PUT('consomable-edit/{réf}',[ConsomableController::class, "edit"]);
Route::delete('consomable-delete/{réf}',[ConsomableController::class, "delete"]);
Route::get('consomable/{id}/image', [ConsomableController::class, 'showImage']);
//Route comd_conso
Route::get('cmd_consomable',[Commander_ConsomablesContoller::class, "index"]);
Route::post('cmd_consomable-create',[Commander_ConsomablesContoller::class, "store"]);
Route::PUT('cmd_consomable-edit/',[Commander_ConsomablesContoller::class, "edit"]);
Route::delete('cmd_consomable-delete/',[Commander_ConsomablesContoller::class, "delete"]);



//Route Livrer_conso
Route::get('liv_consomable',[LivrerConsomableController::class, "index"]);
Route::post('liv_consomable-create',[LivrerConsomableController::class, "store"]);
Route::PUT('liv_consomable-edit/',[LivrerConsomableController::class, "edit"]);
Route::delete('liv_consomable-delete/',[LivrerConsomableController::class, "delete"]);

