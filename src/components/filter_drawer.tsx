"use client";

import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import { useFilterStore } from "src/hooks/use_filter_store";

export function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const { selectedCategories, toggleCategory } = useFilterStore();
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-2 px-4! py-2! bg-[#f8f9fa] border border-(--tertiary-color) rounded-[0.8rem] text-[1.4rem] text-gray-800 transition-colors hover:bg-gray-200"
      >
        <TuneIcon fontSize="large" />
        Filtros
      </button>

      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ width: 320, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Filtros
            </Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 1, fontSize: "1.6rem" }}
          >
            Categorias
          </Typography>
          <FormGroup>
            {[
              ["gamer", "Gamer"],
              ["hardware", "Hardware"],
              ["periféricos", "Periféricos"],
              ["streaming", "Streaming"],
              ["setup", "Setup"],
            ].map(([value, label]) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(value)}
                    onChange={() => toggleCategory(value)}
                  />
                }
                label={<span className="text-[1.6rem]">{label}</span>}
              />
            ))}
          </FormGroup>
        </Box>
      </Drawer>
    </>
  );
}
