"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IEvent } from '@/interfaces/IEvent';
import apiService from '@/utils/axiosConfig';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Pagination,
    Box
} from '@mui/material';

const Events = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                router.push('/');
                return;
            }

            try {
                const response = await apiService.get(`/api/events?page=${page}&per_page=${pageSize}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setEvents(response.data.data);
                setTotal(response.data.total);
            } catch (error) {
                router.push('/');
            }
        };

        fetchEvents();
    }, [router, page, pageSize]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Eventos
            </Typography>
            <Box mb={2}>
                <select value={pageSize} onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event: IEvent) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.start_date}</TableCell>
                                <TableCell>{event.end_date}</TableCell>
                                <TableCell>{event.status ? 'Active' : 'Inactive'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(total / pageSize)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default Events;
