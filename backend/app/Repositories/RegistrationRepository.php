<?php

namespace App\Repositories;

use App\Models\Registration;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class RegistrationRepository implements RegistrationRepositoryInterface
{

    /**
     * @return Collection
     */
    public function getAllRegistrations(): Collection
    {
        return Registration::all();
    }

    /**
     * @param $eventId
     * @param $per_page
     * @param $data
     * @return JsonResponse
     */
    public function getAllRegistrationsForEvent($eventId, $per_page, $search = null): JsonResponse
    {
        $query = Registration::query()->where('event_id', $eventId);

        if (isset($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('cpf', 'like', '%' . $search . '%');
            });
        }

        $registrations = $query->paginate($per_page);

        return response()->json($registrations);
    }

    /**
     * @param $id
     * @return Registration
     */
    public function getRegistrationById($id): Registration
    {
        return Registration::find($id);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createRegistration(array $data): mixed
    {
        return Registration::create($data);
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function updateRegistration($id, array $data): mixed
    {
        $event = Registration::find($id);
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
    public function deleteRegistration($id): bool
    {
        $event = Registration::find($id);
        if ($event) {
            $event->delete();
            return true;
        }
        return false;
    }
}
