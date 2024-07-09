import React, { useState } from 'react';
import apiService from '@/utils/axiosConfig';
import { Box, Button, TextField, Typography, Modal, Alert } from '@mui/material';
import InputMask from 'react-input-mask';

interface RegistrationFormProps {
    eventId: number;
    eventName: string;
    onClose: () => void;
}

const Registration: React.FC<RegistrationFormProps> = ({ eventId, eventName, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [cpfError, setCpfError] = useState('');

    const validateCPF = (cpf: string): boolean => {
        const cleanedCPF = cpf.replace(/\D/g, '');
        return cleanedCPF.length === 11;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'cpf') {
            if (!validateCPF(value)) {
                setCpfError('CPF deve ter exatamente 11 digitos');
            } else {
                setCpfError('');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateCPF(formData.cpf)) {
            setCpfError('CPF deve ter exatamente 11 digitos');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');

            const response = await apiService.post('/api/registrations',
                { ...formData, event_id: eventId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            setSuccess('Inscrição realizada com sucesso');
            setFormData({
                name: '',
                email: '',
                cpf: '',
            });
            setTimeout(onClose, 2000);
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Inscrição - {eventName}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}
                    <TextField
                        label="Nome do Participante"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="CPF"
                        name="cpf"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Inscrever-se
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default Registration;
