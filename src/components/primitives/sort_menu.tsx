"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./sort_menu.module.css";

interface SortMenuProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export function SortMenu({ selectedOption, onSelectOption }: SortMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger}>
        Ordenar por: {selectedOption}
        <ExpandMoreIcon fontSize="small" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} align="end">
          <DropdownMenu.Item
            className={styles.item}
            onSelect={() => onSelectOption("Padrão")}
          >
            Padrão
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={styles.item}
            onSelect={() => onSelectOption("Preço: Menor para Maior")}
          >
            Preço: Menor para Maior
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={styles.item}
            onSelect={() => onSelectOption("Preço: Maior para Menor")}
          >
            Preço: Maior para Menor
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
