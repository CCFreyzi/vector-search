import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, CircularProgress, TableHead, Pagination } from '@mui/material';
import { useResult } from '../../context/ResultContext';
import { sx } from './styles';

const ITEMS_PER_PAGE = 10;

const ResultGrid = () => {
    const { results, loading } = useResult();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [results]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!results || results.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Результатів не знайдено.</div>;
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            <TableContainer>
                <Table sx={{ fontWeight: 600 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={sx.tableCell}>№:</TableCell>
                            <TableCell sx={sx.tableCell}>Товар</TableCell>
                            <TableCell sx={sx.tableCell}>Вартість (₴)</TableCell>
                            <TableCell sx={sx.tableCell}>Вартість з ПДВ (₴)</TableCell>
                            <TableCell sx={sx.tableCell}>Постачальник</TableCell>
                            <TableCell sx={sx.tableCell}>Дата приходу</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedResults.map(({ text, name, costs, costs_NDS, tovar_name, date_prihod }, index) => (
                            <TableRow key={`${text}-${index}`} sx={sx.tableRow}>
                                <TableCell sx={sx.tableCell}>{startIndex + index + 1}</TableCell>
                                <TableCell sx={sx.tableCell}>{tovar_name}</TableCell>
                                <TableCell sx={sx.tableCell} align="right">
                                    {costs} ₴
                                </TableCell>
                                <TableCell sx={sx.tableCell} align="right">
                                    {costs_NDS} ₴
                                </TableCell>
                                <TableCell sx={sx.tableCell} align="right">
                                    {name}
                                </TableCell>
                                <TableCell sx={sx.tableCell} align="right">
                                    {date_prihod}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Pagination count={Math.ceil(results.length / ITEMS_PER_PAGE)} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>
        </>
    );
};

export default ResultGrid;
