<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'cpf' => 'required|string|unique:registrations',
            'email' => 'required|string|email',
            'event_id' => 'required|exists:events,id',
        ];
    }

    public function messages(): array
    {
        return [
            'cpf.unique' => 'O :attribute já está inscrito no evento.',
        ];
    }
}
