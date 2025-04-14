import React, { createContext, useContext, useState, useEffect } from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
    const [originalResults, setOriginalResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filters, setFilters] = useState({
        priceRange: null,
        dateRange: null,
        useNDS: true,
    });
    const [loading, setLoading] = useState(false);

    const updateResults = (data) => {
        setOriginalResults(data);
        setFilteredResults(data);
    };

    const applyFilters = (customFilters = filters) => {
        let data = [...originalResults];

        if (customFilters.priceRange) {
            const [min, max] = customFilters.priceRange;
            data = data.filter((item) => {
                const price = parseFloat(customFilters.useNDS ? item.costs_NDS : item.costs);
                return price >= min && price <= max;
            });
        }

        if (customFilters.dateRange) {
            const [start, end] = customFilters.dateRange;

            data = data.filter((item) => {
                const itemDate = new Date(item.date_prihod);
                return itemDate >= start && itemDate <= end;
            });
        }

        setFilteredResults(data);
    };

    useEffect(() => {
        const hasActiveFilters = filters.priceRange !== null || filters.dateRange !== null || filters.useNDS !== true;

        if (hasActiveFilters) {
            applyFilters(filters);
        } else {
            setFilteredResults([]);
        }
    }, [filters]);

    return (
        <ResultContext.Provider
            value={{
                originalResults,
                filteredResults,
                loading,
                setLoading,
                updateResults,
                filters,
                setFilters,
                applyFilters,
            }}
        >
            {children}
        </ResultContext.Provider>
    );
};

export const useResult = () => useContext(ResultContext);
