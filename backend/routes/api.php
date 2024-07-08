<?php

use App\Http\Controllers\{EventController, RegistrationController};
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/events', EventController::class);
    Route::resource('/registrations', RegistrationController::class);
});
