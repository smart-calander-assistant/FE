import React, { useState } from 'react';

function NumberSelector(props) {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    if (props.onSelect) {
      props.onSelect(number);
    }
  };

  const renderNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 5; i++) {
      numbers.push(
        <button
          key={i}
          onClick={() => handleNumberClick(i)}
          className={i === selectedNumber ? 'selected' : ''}
        >
          {i}
        </button>
      );
    }
    return numbers;
  };

  return (
    <div className="number-selector">
      <p>Select a number:</p>
      <div className="number-buttons">{renderNumbers()}</div>
      <p>Selected Number: {selectedNumber}</p>
    </div>
  );
}

export default NumberSelector;
