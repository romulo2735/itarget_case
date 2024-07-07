<?php

namespace App\Services;

use App\Repositories\EventRepositoryInterface;

class EventService
{
    public function __construct(protected EventRepositoryInterface $eventRepository)
    {
    }

    public function listEvents()
    {
        return $this->eventRepository->getAllEvents();
    }

    public function getEventById($id)
    {
        return $this->eventRepository->getEventById($id);
    }

    public function createEvent(array $data)
    {
        return $this->eventRepository->createEvent($data);
    }

    public function updateEvent($id, array $data)
    {
        return $this->eventRepository->updateEvent($id, $data);
    }
}
