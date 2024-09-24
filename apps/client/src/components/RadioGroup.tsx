import { ReactNode } from 'react';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export function RadioGroup({children }: RadioGroupProps) {
  return (
    <div role="radiogroup" className="flex space-x-4">
      {children}
    </div>
  );
}
