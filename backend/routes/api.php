<?php

use App\Http\Controllers\{EventController, RegistrationController, UserController};
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::put('user/update', [UserController::class, 'update']);
    Route::resource('/events', EventController::class);
    Route::get('/events/{event}/registrations', [RegistrationController::class, 'getRegistrationsForEvent']);
    Route::resource('/registrations', RegistrationController::class);
});
