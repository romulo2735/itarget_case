<?php

namespace App\Repositories;

use App\Models\Registration;
use Illuminate\Database\Eloquent\Collection;

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
