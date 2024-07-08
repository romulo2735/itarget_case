"use client"

import React, {useEffect, useState} from 'react';
import apiService from "@/utils/axiosConfig";
import {IRegistration} from "@/interfaces/IRegistration";
import {IEvent} from "@/interfaces/IEvent";

export default function Registration() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<IRegistration>({
        name: '',
        email: '',
        cpf: '',
        event_id: '',
    });

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        apiService.get('/api/events', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setEvents(response.data.data);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiService.post('/api/registrations', formData).then(response => {
            console.log('Registration successful', response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                required
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input
                type="text"
                name="cpf"
                value={formData.cpf}
                required
                onChange={e => setFormData({...formData, cpf: e.target.value})}
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <select
                name="event_id"
                value={formData.event_id}
                onChange={e => setFormData({...formData, event_id: e.target.value})}
                required
            >
                {events?.map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                ))}
            </select>
            <button type="submit">Register</button>
        </form>
    );
};