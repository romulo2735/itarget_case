"use client"

import {useState, useEffect, useCallback} from 'react';
import apiService from "@/utils/axiosConfig";
import {IRegistration} from "@/interfaces/IRegistration";

export default function Registrations() {
    const [registrations, setRegistrations] = useState<IRegistration[]>([]);
    const [perPage, setPerPage] = useState(10);

    const fetchRegistrations = useCallback(() => {
        apiService.get('/api/registrations', {params: {per_page: perPage}}).then(response => {
            setRegistrations(response.data.data);
        });
    }, [perPage]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    return (
        <div>
            <label>
                Items per page:
                <select value={perPage} onChange={e => setPerPage(parseInt(e.target.value, 10))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
            <ul>
                {registrations.map(registration => (
                    <li key={registration.id}>{registration.name} - {registration.email}</li>
                ))}
            </ul>
        </div>
    );
};
