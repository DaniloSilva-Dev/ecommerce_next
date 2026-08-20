import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import CartIndicator from "./cart_indicator";
import SearchBar from "./search_bar";
import { Button } from "./primitives/button";

export default function Navbar() {
  return (
    <header className="w-full border-b border-[#e0e0e0] bg-[--secondary-color]">
      <div className="flex h-20 w-full items-center justify-between px-10! lg:px-16! ">
        {/* lado esquerdo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-4xl font-bold tracking-tight text-(--primary-color) no-underline"
          >
            E-commerce
          </Link>
        </div>
        {/* Barra de busca */}
        <div className="hidden max-w-300 grow min-[900px]:block">
          <SearchBar />
        </div>
        {/* lado direito */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="Busca inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-slate-500 min-[900px]:hidden"
            aria-label="buscar"
          >
            <SearchIcon />
          </button>

          <CartIndicator aria-label="carrinho de compra" />

          <Button onClick={() => (window.location.href = "/checkout")}>
            Checkout
          </Button>
        </div>
      </div>
    </header>
  );
}
