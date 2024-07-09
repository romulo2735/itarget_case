<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Requests\UpdateRegistrationRequest;
use App\Models\Event;
use App\Models\Registration;
use App\Services\RegistrationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{

    /**
     * RegistrationController constructor.
     * @param RegistrationService $registrationService
     */
    public function __construct(protected RegistrationService $registrationService)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        return $this->registrationService->listRegistrations();
    }

    public function getRegistrationsForEvent(Request $request, Event $event)
    {
        return $this->registrationService->listRegistrationsForEvent(
            $event->id,
            $request->get('per_page'),
            $request->get('search')
        );
    }

    /**
     * Display the specified resource.
     *
     * @param Registration $registration
     * @return JsonResponse
     */
    public function show(Registration $registration)
    {
        return $this->registrationService->getRegistrationById($registration->id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreRegistrationRequest $request
     * @return JsonResponse
     */
    public function store(StoreRegistrationRequest $request)
    {
        $registration = $this->registrationService->createRegistration($request->validated());

        return response()->json($registration, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Registration $registration
     * @param UpdateRegistrationRequest $request
     * @return JsonResponse
     */
    public function update(Registration $registration, UpdateRegistrationRequest $request)
    {
        $registration = $this->registrationService->updateRegistration($registration->id, $request->validated());

        return response()->json($registration);
    }
}
