"use client";

import React, {useState} from 'react';
import apiService from "@/utils/axiosConfig";
import {useRouter} from 'next/navigation';
import {Container, TextField, Button, Typography, Box, Alert} from '@mui/material';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiService.post('/api/login', {email, password});

            const token = response.data.token;

            localStorage.setItem('authToken', token);

            router.push('/events');
        } catch (error) {
            setError('Invalid credentials');
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
                    Login
                </Typography>
                {error && (
                    <Alert severity="error" sx={{mb: 2, width: '100%'}}>
                        {error}
                    </Alert>
                )}
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 2}}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};