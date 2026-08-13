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
      </body>
    </html>
  );
}
