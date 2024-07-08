"use client";

import React, {useState} from 'react';
import apiService from '@/utils/axiosConfig';
import {useRouter} from 'next/navigation';
import {Container, TextField, Button, Typography, Box, Alert} from '@mui/material';
import {IUser} from '@/interfaces/IUser';

const RegisterPage = () => {
    const [formData, setFormData] = useState<IUser>({
        name: '', email: '', password: '', password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await apiService.post('/api/register', formData);
            setSuccess('Cadastro realizado com sucesso!');

            setFormData(response.data);
            setTimeout(() => router.push('/'), 2000);

        } catch (error) {
            setError('Não foi possivel realizar o cadastro');
        }
    };

    return (
        <Container maxWidth="sm" sx={{mt: 8}}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Cadastra-se
                </Typography>
                {error && (
                    <Alert severity="error" sx={{mb: 2, width: '100%'}}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{mb: 2, width: '100%'}}>
                        {success}
                    </Alert>
                )}
                <TextField
                    label="Nome"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData?.name}
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
                    value={formData?.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Senha"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData?.password}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Confirme a senha"
                    name="password_confirmation"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData?.password_confirmation}
                    onChange={handleChange}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 2}}
                >
                    Enviar
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterPage;
