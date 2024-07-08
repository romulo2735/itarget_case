<?php

namespace App\Repositories;

use App\Models\User;

/**
 * Class UserRepository
 * @package App\Repositories
 */
class UserRepository implements UserRepositoryInterface
{

    /**
     * @param array $data
     * @return mixed
     */
    public function store(array $data): mixed
    {
        return User::create($data);
    }

    /**
     * @param User $user
     * @param array $data
     * @return mixed
     */
    public function update(User $user, array $data): mixed
    {
        $user->update($data);

        return $user;
    }

    /**
     * @param string $email
     * @return mixed
     */
    public function findByEmail(string $email): mixed
    {
        return User::where('email', $email)->first();
    }
}
