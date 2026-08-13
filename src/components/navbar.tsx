import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

import CartIndicator from "./cart_indicator";
import SearchBar from "./search_bar";

export default function Navbar() {
  return (
    <header className="w-full border-b border-[#e0e0e0] bg-(--neutral-color)">
      <div className="mx-auto  ">
        <div className="flex min-h-16 items-center justify-between">
          {/* lado esquerdo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-(--primary-color) no-underline"
            >
              E-commerce
            </Link>
            <div className="hidden max-w-50 grow min-[900px]:block">
              <SearchBar />
            </div>
          </div>

          {/* centro */}
          <nav className="hidden items-center justify-center gap-8 min-[900px]:flex">
            <button
              type="button"
              className="border-0 border-b-2 border-(--primary-color) bg-transparent pb-1 font-inherit text-sm font-semibold text-(--secondary-color)"
            >
              Loja
            </button>
            <button
              type="button"
              className="border-0 border-b-2 border-transparent bg-transparent pb-1 font-inherit text-sm font-medium text-slate-500 hover:text-(--primary-color)"
            >
              Categorias
            </button>
            <button
              type="button"
              className="border-0 border-b-2 border-transparent bg-transparent pb-1 font-inherit text-sm font-medium text-slate-500 hover:text-(--primary-color)"
            >
              Ofertas
            </button>
          </nav>

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

            <Link
              href="/checkout"
              className="bg-(--primary-color) font-medium text-white rounded-md px-6 py-6 shrink-0"
              passHref
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
