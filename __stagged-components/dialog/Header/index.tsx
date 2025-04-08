import { joinClasses } from "@porto-ocean/utils";
import React from "react";

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const Header = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      className={joinClasses(["dialog__header", String(className)])}
      {...props}
    />
  );
};
