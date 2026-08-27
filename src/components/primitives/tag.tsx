import cx from "classnames";
import styles from "./tag.module.css";

export interface TagProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  variant?: "offer" | "new";
}

export function Tag({
  children,
  className,
  variant = "new",
  ...props
}: TagProps) {
  return (
    <div
      className={cx(styles.tag, className, {
        [styles.offer]: variant === "offer",
        [styles.new]: variant === "new",
      })}
      {...props}
    >
      {children}
    </div>
  );
}
