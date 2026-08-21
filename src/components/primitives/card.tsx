import cx from "classnames";
import styles from "./card.module.css";
import Image from "next/image";
import { useState } from "react";

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
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <div className={cx(styles.cardImage, className)} {...props}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cx(styles.cardImageContent, {
          [styles.cardImageContentLandscape]: isLandscape,
        })}
        onLoad={(event) => {
          setIsLandscape(
            event.currentTarget.naturalWidth > event.currentTarget.naturalHeight,
          );
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
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
