"use client";

import React from "react";
import styles from "./badges.module.css";

type BadgeProps = {
    text: string;
    varient: "fancy" | "outline" | "default" | "danger";
    width?: number;
};

export default function Badge({
    text,
    varient,
    width 
}: BadgeProps) {
    return (
        <div
            className={`${styles.badgeContainer} ${styles[varient]}`}
            style={{
                width: width ? `${width}px` : "max-content",
            }}
        >
            <span>{text}</span>
        </div>
    );
}