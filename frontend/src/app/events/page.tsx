"use client"

import { useEffect, useState } from 'react';
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
    Box,
    Button
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ReorderIcon from '@mui/icons-material/Reorder';
import Registration from "@/components/RegistrationForm";
import RegistrationsList from "@/components/RegistrationsList";

const Events = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [viewRegistrationsEvent, setViewRegistrationsEvent] = useState<IEvent | null>(null);
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

    const handleRegisterClick = (event: IEvent) => {
        setSelectedEvent(event);
    };

    const handleViewRegistrationsClick = (event: IEvent) => {
        setViewRegistrationsEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
        setViewRegistrationsEvent(null);
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
                            <TableCell>Nome</TableCell>
                            <TableCell>Inicio</TableCell>
                            <TableCell>Fim</TableCell>
                            <TableCell>Ativo</TableCell>
                            <TableCell>Increver-se</TableCell>
                            <TableCell>Inscritos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event: IEvent) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.start_date}</TableCell>
                                <TableCell>{event.end_date}</TableCell>
                                <TableCell>{event.status ?
                                    <CheckBoxIcon color={'success'} /> :
                                    <IndeterminateCheckBoxIcon color={'error'} />
                                }
                                </TableCell>
                                <TableCell>
                                    <Button
                                        disabled={!event.status}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleRegisterClick(event)}
                                    >
                                        <PersonAddAlt1Icon />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        disabled={!event.status}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewRegistrationsClick(event)}
                                    >
                                        <ReorderIcon />
                                    </Button>
                                </TableCell>
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
            {selectedEvent && (
                <Registration
                    eventId={selectedEvent.id}
                    eventName={selectedEvent.name}
                    onClose={handleClose}
                />
            )}
            {viewRegistrationsEvent && (
                <RegistrationsList
                    eventId={viewRegistrationsEvent.id}
                    eventName={viewRegistrationsEvent.name}
                    open={!!viewRegistrationsEvent}
                    onClose={handleClose}
                />
            )}
        </Container>
    );
};

export default Events;
