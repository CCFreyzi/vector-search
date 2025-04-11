import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useResult } from "../../context/ResultContext";
import axios from "axios";
import { sx } from "./styles";
import mixpanel from "mixpanel-browser";

const FormSearch = () => {
  const [query, setQuery] = useState("");
  // const [filterText, setFilterText] = useState("");
  const { setResults, setLoading } = useResult();

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://51.21.219.221:8000/api/v1/search/",
        {
          params: {
            query,
            limit: 100,
            // filter_text: filterText,
          },
        }
      );
      handleSendMessage(query);
      setResults(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };

  return (
    <>
      <Box sx={sx.wrapper}>
        <h1>Пошуковий модуль</h1>
      </Box>
      <Box sx={sx.wrapper}>
        <TextField
          label="Що шукаємо"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            width: "400px",
          }}
        />
        {/* <TextField label="Фільтр" value={filterText} onChange={(e) => setFilterText(e.target.value)} sx={sx.input} /> */}
        <Button variant="contained" onClick={handleSearch}>
          Пошук
        </Button>
      </Box>
    </>
  );
};

export default FormSearch;

const handleSendMessage = (query, filterText) => {
  mixpanel.track("Message Sent", {
    query: query,
    filter: filterText,
    timestamp: new Date().toISOString(),
  });
};
