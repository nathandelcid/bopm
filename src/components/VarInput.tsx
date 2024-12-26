import React, { useState } from 'react';

function VarInput({ label }: { label: string }) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="numberInput"></label>
      <input
        id="numberInput"
        type="number"
        value={value}
        onChange={handleChange}
        className="small-input"
      />
      <p className="small-text">{label}</p> {/* Use the label prop here */}
    </div>
  );
}

export default VarInput;