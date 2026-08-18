"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search")?.toString() || "",
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "0.1rem solid var(--neutral-color)",
        bgcolor: "var(--neutral-color)",
        borderRadius: 4,
        px: 1,
        py: 0.5,
        flexGrow: 1,
        maxWidth: 600,
      }}
    >
      <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
      <InputBase
        placeholder="Pesquisar produtos"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ flex: 1, fontSize: "1.4rem" }}
      />
    </Box>
  );
}
