import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, Pagination, Button } from '@mui/material';
import apiService from '@/utils/axiosConfig';
import { IRegistration } from '@/interfaces/IRegistration';

interface RegistrationsListProps {
    eventId: number;
    eventName: string;
    open: boolean;
    onClose: () => void;
}

const RegistrationsList: React.FC<RegistrationsListProps> = ({ eventId, eventName, open, onClose }) => {
    const [registrations, setRegistrations] = useState<IRegistration[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const token = localStorage.getItem('authToken');


    useEffect(() => {
        const fetchRegistrations = async () => {
            const response = await apiService.get(`/api/events/${eventId}/registrations?page=${page}&per_page=${pageSize}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRegistrations(response.data.data);
            setTotal(response.data.total);
        };

        if (open) {
            fetchRegistrations();
        }
    }, [eventId, page, pageSize, search, open]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Inscrições para {eventName}</DialogTitle>
            <DialogContent>
                <Box mb={2} display="flex" justifyContent="space-between">
                    <TextField
                        label="Pesquisar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registrations.map((registration) => (
                            <TableRow key={registration.id}>
                                <TableCell>{registration.name}</TableCell>
                                <TableCell>{registration.cpf}</TableCell>
                                <TableCell>{registration.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                        count={Math.ceil(total / pageSize)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationsList;
