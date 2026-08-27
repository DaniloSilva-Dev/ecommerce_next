import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) {
  return (
    <div
      className="flex items-center"
      style={{
        border: "0.1rem solid var(--tertiary-color)",
        width: "fit-content",
        borderRadius: "0.8rem",
        padding: "0.2rem 0.4rem",
        marginTop: "0.5rem",
        gap: "0.5rem",
      }}
    >
      <button type="button" onClick={onDecrease} style={{ cursor: "pointer" }}>
        <RemoveIcon />
      </button>

      <span>{quantity}</span>

      <button type="button" onClick={onIncrease} style={{ cursor: "pointer" }}>
        <AddIcon />
      </button>
    </div>
  );
}
