import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { useResult } from "../../context/ResultContext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Typography from "@mui/material/Typography";
import { sx } from "./style";
import Box from "@mui/material/Box";

export default function DateRangeFilter() {
    const { filters, setFilters, applyFilters } = useResult();
    const [range, setRange] = useState(null);

    useEffect(() => {
        if (filters.dateRange === null) {
            setRange(null);
        }
    }, [filters.dateRange]);

    const handleChange = (e) => {
        const [start, end] = e.value || [];
        setRange(e.value);

        const newFilters = {
            ...filters,
            dateRange: start && end ? [start, end] : null,
        };

        setFilters(newFilters);
        applyFilters(newFilters);
    };

    return (
        <Box sx={sx.distance}>
            <Typography variant="body2" sx={{ mb: 1, fontSize: 14, fontWeight: "bold" }}>
                Дата приходу
            </Typography>
            <Calendar key={filters.dateRange === null ? "reset" : "active"} id="daterange" value={range} onChange={handleChange} selectionMode="range" readOnlyInput dateFormat="yy-mm-dd" showIcon placeholder="р-м-д - р-м-д" />
        </Box>
    );
}
