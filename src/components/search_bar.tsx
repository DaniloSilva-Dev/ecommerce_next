"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { searchParamsToUrlQuery } from "next/dist/shared/lib/router/utils/querystring";


export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search")?.toString() || "");

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
