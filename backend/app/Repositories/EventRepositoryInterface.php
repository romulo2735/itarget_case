<?php

namespace App\Repositories;

use App\Models\Event;

interface EventRepositoryInterface
{
    public function getAllEvents(int $per_page);
    public function getEventById($id);
    public function createEvent(array $data);
    public function updateEvent($id, array $data);
    public function deleteEvent($id);
}
