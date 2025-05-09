import React, { useState } from "react";
import RadioButton from "../RadioComponent";

interface RadioButtonGroupProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          name="options"
          value={option.value}
          checked={selectedValue === option.value}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
