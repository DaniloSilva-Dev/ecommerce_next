import "@/app/global.css";
import AppThemeProvider from "@/theme/app_theme_provider";

export const metadata = {
  title: "E-commerce",
  description: "E-commerce Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: "var(--neutral-color)" }}>
        <AppThemeProvider>{children}</AppThemeProvider>
        <footer className="w-full border-t border-[#e0e0e0] bg-[--secondary-color]">
          <div className="flex flex-col h-20 w-full  align-start px-10! lg:px-16!">
            <h3 style={{ fontSize: "2.4rem", fontWeight: "bold" }}>
              Ecommerce
            </h3>
            <span style={{ display: "block", fontSize: "1.4rem" }}>
              &copy; {new Date().getFullYear()} Todos os direitos reservados.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
