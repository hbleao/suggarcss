import { joinClasses } from "@porto-ocean/utils";

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const Body = ({ children, className, ...props }: DialogHeaderProps) => {
  return (
    <div
      className={joinClasses(["dialog__body", String(className)])}
      {...props}
    >
      {children}
    </div>
  );
};
