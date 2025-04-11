import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    return <ResultContext.Provider value={{ results, setResults, loading, setLoading }}>{children}</ResultContext.Provider>;
};

export const useResult = () => useContext(ResultContext);
