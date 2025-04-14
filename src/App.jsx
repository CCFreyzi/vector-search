import React from "react";
import { Container } from "@mui/material";
import FormSearch from "./components/FormSearch";
import ResultGrid from "./components/ResultGrid";

function App() {
  return (
    <Container disableGutters sx={{ p: 0, mt: 4 }}>
      <FormSearch />
      <ResultGrid />
    </Container>
  );
}

export default App;
