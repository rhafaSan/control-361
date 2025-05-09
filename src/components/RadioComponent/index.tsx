import React from "react";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`
        w-5 h-5 rounded-full border-2
        flex items-center justify-center
        transition-colors duration-200
        ${checked ? "border-action" : "border-gray-400 bg-inherit"}
      `}
      >
        {checked && <div className="w-2.5 h-2.5 rounded-full bg-action" />}
      </div>
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default RadioButton;
