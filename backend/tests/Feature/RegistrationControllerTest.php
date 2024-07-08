<?php

namespace Tests\Feature;

use App\Models\Event;
use Mockery;
use Tests\TestCase;
use App\Models\User;
use App\Models\Registration;
use App\Services\RegistrationService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $registrationService;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->registrationService = Mockery::mock(RegistrationService::class);
        $this->app->instance(RegistrationService::class, $this->registrationService);

        $this->user = User::factory()->create();
    }

    public function test_index()
    {
        $registrations = Registration::factory()->count(5)->make();

        $this->registrationService
            ->shouldReceive('listRegistrations')
            ->once()
            ->andReturn(response()->json($registrations));

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/registrations');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    public function test_show()
    {
        $registration = Registration::factory()->create();

        $this->registrationService
            ->shouldReceive('getRegistrationById')
            ->once()
            ->with(1)
            ->andReturn(response()->json($registration));

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/registrations/1');

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $registration->id]);
    }

    public function test_store()
    {
        $event = Event::factory()->create();

        $registrationData = [
            'name' => 'John Doe',
            'cpf' => '12345678901',
            'email' => 'john@example.com',
            'event_id' => $event->id
        ];

        $this->registrationService
            ->shouldReceive('createRegistration')
            ->once()
            ->with($registrationData)
            ->andReturn((new Registration())->forceFill($registrationData));

        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/registrations', $registrationData);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'John Doe']);
    }

    public function test_update()
    {
        $event = Event::factory()->create();
        $registration = Registration::factory()->make();

        $updateData = [
            'name' => 'Jane Doe',
            'cpf' => '09876543210',
            'email' => 'jane@example.com',
            'event_id' => $event->id
        ];

        $this->registrationService
            ->shouldReceive('updateRegistration')
            ->once()
            ->with($registration->id, $updateData)
            ->andReturn((new Registration())->forceFill($updateData));

        $response = $this->actingAs($this->user, 'sanctum')->putJson('/api/registrations/1', $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Jane Doe']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}

