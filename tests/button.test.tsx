import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/primitives/button";

describe("Button", () => {
  it("renderiza o conteúdo e a variante informada", () => {
    render(<Button variant="secondary">Adicionar</Button>);

    const button = screen.getByRole("button", { name: "Adicionar" });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("secondary");
  });

  it("mantém o estado desabilitado e não executa o clique", async () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Finalizar Compra
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Finalizar Compra" });

    expect(button).toBeDisabled();
    button.click();
    expect(onClick).not.toHaveBeenCalled();
  });
});
