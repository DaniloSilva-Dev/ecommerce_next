"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "#f3f4f6",
        borderRadius: 4,
        px: 2,
        py: 0.5,
        flexGrow: 1,
        maxWidth: 400,
      }}
    >
      <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
      <InputBase
        placeholder="Pesquisar produtos"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ flex: 1, fontSize: "0.875rem" }}
      />
    </Box>
  );
}
