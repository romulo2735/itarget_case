<?php

namespace App\Repositories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\PaginatedResourceResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

/**
 * Class EventRepository
 * @package App\Repositories
 */
class EventRepository implements EventRepositoryInterface
{

    /**
     * @param $per_page
     * @return LengthAwarePaginator
     */
    public function getAllEvents($per_page): LengthAwarePaginator
    {
        return Event::query()->paginate($per_page);
    }

    /**
     * @param $id
     * @return Event
     */
    public function getEventById($id): Event
    {
        return Event::find($id);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createEvent(array $data): mixed
    {
        return Event::create($data);
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function updateEvent($id, array $data): mixed
    {
        $event = Event::find($id);
        if ($event) {
            $event->update($data);
            return $event;
        }
        return null;
    }

    /**
     * @param $id
     * @return bool
     */
    public function deleteEvent($id): bool
    {
        $event = Event::find($id);
        if ($event) {
            $event->delete();
            return true;
        }
        return false;
    }
}
