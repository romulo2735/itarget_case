<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Services\EventService;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

/**
 * Class EventController
 * @package App\Http\Controllers
 */
class EventController extends Controller
{

    /**
     * EventController constructor.
     * @param EventService $eventService
     */
    public function __construct(protected EventService $eventService)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return $this->eventService->listEvents();
    }

    /**
     * Display the specified resource.
     *
     * @param Event $event
     * @return Response
     */
    public function show(Event $event)
    {
        return $this->eventService->getEventById($event->id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreEventRequest $request
     * @return JsonResponse
     */
    public function store(StoreEventRequest $request)
    {
        $event = $this->eventService->createEvent($request->validated());

        return response()->json($event, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Event $event
     * @param UpdateEventRequest $request
     * @return JsonResponse
     */
    public function update(Event $event, UpdateEventRequest $request)
    {
        $event = $this->eventService->updateEvent($event->id, $request->validated());

        return response()->json($event);
    }
}
