
interface RadioGroupItemProps {
  id: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export function RadioGroupItem({ id, value, checked, onChange }: RadioGroupItemProps) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={`cursor-pointer border-2 rounded-full p-2 ${
          checked ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        {value}
      </label>
    </div>
  );
}
