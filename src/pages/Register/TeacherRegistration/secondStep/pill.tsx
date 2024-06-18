import React, { useState } from 'react';

interface Option {
  id: string;
  name: string;
}
interface PillButtonProps {
  values: Option[]; // Array of values for the buttons
  onChange: (selectedValues: string[]) => void; // Callback function to handle value changes
}

const PillButton: React.FC<PillButtonProps> = ({ values, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <div>
      {values.map((value) => (
        <button
          key={value.id}
          type="button"
          onClick={() => handleToggle(value.id)}
          className={selectedValues.includes(value.id) ? 'selected' : ''}
          style={{
            margin: '5px',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '20px',
            backgroundColor: selectedValues.includes(value.id)
              ? '#007bff'
              : 'transparent',
            color: selectedValues.includes(value.id) ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          {value.name}
        </button>
      ))}
    </div>
  );
};

export default PillButton;
