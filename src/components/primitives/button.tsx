import cx from "classnames";
import React from "react";
import styles from "./button.module.css";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{
        variant?: "primary" | "secondary" | "terciary";
        size?: "sm" | "md" | "lg";
    }

    export function Button ({children, className, variant = "primary", size = "md", ...props}: ButtonProps) {
        return (
            <button className={cx(
                styles.primary,
                styles[variant],
                styles[`size-${size}`],
                className
            )}
            {...props}
            >
                {children}
            </button>
        )
    }
