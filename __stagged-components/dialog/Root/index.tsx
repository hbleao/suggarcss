"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "../styles.scss";

import { joinClasses } from "@porto-ocean/utils";

type DialogRootProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  variant?: "small" | "medium" | "large";
  theme?: "light" | "dark";
};

export const Root = ({
  isOpen,
  children,
  variant = "small",
  theme = "light",
  className = "",
  ...props
}: DialogRootProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const variantClass = `--${variant}`;
  const themeClass = `--${theme}`;

  return mounted
    ? createPortal(
        <div
          className={joinClasses([
            'dialog dialog__overlay',
            isOpen ? "dialog__overlay--open" : "",
            className,
            themeClass,
          ])}
          {...props}
        >
          <div
            className={joinClasses(["dialog__box", variantClass])}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};
