import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function Button({ className, children, ...props }: ButtonProps) {
    return (<button className={`bg-blue-500 text-white p-2 rounded ${className}`} {...props}>
        {children}
    </button>);
};