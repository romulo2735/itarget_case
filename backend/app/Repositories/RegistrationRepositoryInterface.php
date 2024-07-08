<?php

namespace App\Repositories;

use App\Models\Registration;

interface RegistrationRepositoryInterface
{
    public function getAllRegistrations();
    public function getRegistrationById($id);
    public function createRegistration(array $data);
    public function updateRegistration($id, array $data);
    public function deleteRegistration($id);
}
