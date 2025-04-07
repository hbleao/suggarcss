import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
declare function Button({ children, className, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

export { Button, Input, type InputProps };
