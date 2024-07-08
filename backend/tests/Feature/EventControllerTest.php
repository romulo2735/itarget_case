<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Event;
use App\Models\User;
use App\Services\EventService;
use Mockery;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $eventService;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->eventService = Mockery::mock(EventService::class);
        $this->app->instance(EventService::class, $this->eventService);

        $this->user = User::factory()->create();
    }

    public function test_index()
    {
        $events = Event::factory()->count(5)->make();

        $this->eventService
            ->shouldReceive('listEvents')
            ->once()
            ->andReturn(response()->json($events));

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/events');

        $response->assertStatus(200)
            ->assertJsonCount(5);
    }

    public function test_show()
    {
        $event = Event::factory()->create();

        $this->eventService
            ->shouldReceive('getEventById')
            ->once()
            ->with(1)
            ->andReturn(response()->json($event));

        $response = $this->actingAs($this->user, 'sanctum')->getJson('/api/events/1');

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $event->id]);
    }

    public function test_store()
    {
        $eventData = [
            'name' => 'New Event',
            'start_date' => '2023-01-01',
            'end_date' => '2023-01-02',
            'status' => true,
        ];

        $this->eventService
            ->shouldReceive('createEvent')
            ->once()
            ->with($eventData)
            ->andReturn((new Event())->forceFill($eventData));

        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/events', $eventData);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'New Event']);
    }

    public function test_update()
    {
        $event = Event::factory()->create();

        $updateData = [
            'name' => 'Updated Event',
            'start_date' => '2023-01-01',
            'end_date' => '2023-01-02',
            'status' => true,
        ];

        $this->eventService
            ->shouldReceive('updateEvent')
            ->once()
            ->with($event->id, $updateData)
            ->andReturn($event->forceFill($updateData));

        $response = $this->actingAs($this->user, 'sanctum')->putJson("/api/events/{$event->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Event']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}


