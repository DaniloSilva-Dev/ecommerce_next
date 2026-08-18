import cx from "classnames";
import styles from "./card.module.css";
import Image from "next/image";

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

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

function CardBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx(styles.cardBody, className)} {...props}>
      {children}
    </div>
  );
}

function CardImage({ src, alt, className, ...props }: CardImageProps) {
  return (
    <div className={cx(styles.cardImage, className)} {...props}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx(styles.cardFooter, className)} {...props}>
      {children}
    </div>
  );
}

Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Body = CardBody;
