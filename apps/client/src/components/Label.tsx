import { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string;
    children: ReactNode;
  }
  
  export function Label({ htmlFor, children }: LabelProps) {
    return (
      <label htmlFor={htmlFor} className="text-gray-700 ml-2">
        {children}
      </label>
    );
  }
  