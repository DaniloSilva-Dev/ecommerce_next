import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import CartIndicator from "./cart_indicator";
import SearchBar from "./search_bar";
import { Button } from "./primitives/button";

export default function Navbar() {
  return (
    <header className="w-full border-b border-[#e0e0e0] bg-[--secondary-color]">
      <div className="relative flex h-20 w-full min-w-0 items-center justify-between gap-2 px-4! sm:px-6! lg:px-16!">
        {/* lado esquerdo */}
        <div className="min-w-0 flex-1">
          <Link
            href="/"
            className="block max-w-full truncate whitespace-nowrap text-xl font-bold tracking-tight text-(--primary-color) no-underline sm:text-3xl lg:text-4xl"
          >
            E-commerce
          </Link>
        </div>
        {/* Barra de busca */}
        <div className="hidden min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:block min-[900px]:w-100 min-[900px]:-translate-x-1/2">
          <SearchBar />
        </div>
        {/* lado direito */}
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            className="Busca inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-slate-500 min-[900px]:hidden"
            aria-label="buscar"
          >
            <SearchIcon />
          </button>

          <CartIndicator aria-label="carrinho de compra" />

          <Button
            className="hidden sm:inline-flex"
            onClick={() => (window.location.href = "/checkout")}
          >
            Checkout
          </Button>
        </div>
      </div>
    </header>
  );
}
