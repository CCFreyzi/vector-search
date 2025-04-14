import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useResult } from '../../context/ResultContext';
import axios from 'axios';
import { sx } from './styles';

const FormSearch = () => {
    const [query, setQuery] = useState('');
    const { updateResults, setLoading } = useResult();

    const handleSearch = async () => {
        try {
            setLoading(true);

            const response = await axios.get('http://51.21.219.221:8000/api/v1/search/', {
                params: {
                    query,
                    limit: 100,
                },
            });
            updateResults(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error while searching:', error);
        }
    };

    return (
        <>
            <Box sx={sx.wrapper}>
                <h1>Пошуковий модуль</h1>
            </Box>
            <Box sx={sx.wrapper}>
                <TextField label="Введіть пошуковий запит" value={query} onChange={(e) => setQuery(e.target.value)} sx={sx.input} />
                <Button variant="contained" onClick={handleSearch} sx={sx.button}>
                    Пошук
                </Button>
            </Box>
        </>
    );
};

export default FormSearch;
