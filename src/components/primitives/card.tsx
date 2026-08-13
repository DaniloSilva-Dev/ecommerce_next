import cx from "classnames";
import styles from "./card.module.css";

// export type CardProps = {
// disabled: boolean
// } & React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>

export interface CardProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  disabled?: boolean;
}

export function Card({ children, className, disabled, ...props }: CardProps) {
  return (
    <div
      className={cx(styles.card, className, {
        [styles.cardDisabled]: disabled,
      })}
      {...props}
    >
      {disabled && <div className={styles.disabledOverlay}> </div>}
      {children}
    </div>
  );
}

function CardBody({ children }: React.PropsWithChildren) {
  return <div className={styles.cardBody}>{children}</div>;
}

Card.Body = CardBody;
