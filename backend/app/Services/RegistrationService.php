<?php

namespace App\Services;

use App\Repositories\RegistrationRepositoryInterface;

class RegistrationService
{
    public function __construct(protected RegistrationRepositoryInterface $registrationRepository)
    {
    }

    public function listRegistrations()
    {
        return $this->registrationRepository->getAllRegistrations();
    }

    public function getRegistrationById($id)
    {
        return $this->registrationRepository->getRegistrationById($id);
    }

    public function createRegistration(array $data)
    {
        return $this->registrationRepository->createRegistration($data);
    }

    public function updateRegistration($id, array $data)
    {
        return $this->registrationRepository->updateRegistration($id, $data);
    }
}
