import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {

    return (
        <input className={`w-100px border p-2 ${className}`} {...props} />);
};