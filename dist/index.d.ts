import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes } from 'react';

type Size = "small" | "large";
type Styles = "primary" | "secondary" | "ghost";
type Variant = "insurance" | "banking" | "health" | "danger" | "negative" | "disabled";
type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    size?: Size;
    styles?: Styles;
    width?: "contain" | "fluid";
    variant?: Variant;
    isLoading?: boolean;
};

declare const Button: ({ variant, styles, size, width, isLoading, className, children, ...restProps }: ButtonProps) => react_jsx_runtime.JSX.Element;

type RootProps = HTMLAttributes<HTMLDivElement> & {
    theme?: "light" | "dark";
    variant?: "default" | "selected";
};
declare const Root: ({ theme, variant, children, }: RootProps) => react_jsx_runtime.JSX.Element;

export { Button, Root, type RootProps };
