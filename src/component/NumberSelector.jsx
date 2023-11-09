import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function NumberSelector({ onSelect, number, defaultNumber }) {
  const [selectedNumber, setSelectedNumber] = useState(defaultNumber);

  useEffect(() => {
    setSelectedNumber(defaultNumber);
  }, [defaultNumber]);

  const handleNumberClick = (priority) => {
    setSelectedNumber(priority);
    if (onSelect) {
      onSelect(priority);
    }
  };

  const renderNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= number; i++) {
      numbers.push(
        <NumberButton
          key={i}
          onClick={() => handleNumberClick(i)}
          className={i === selectedNumber ? 'selected' : ''}
        >
          {i}
        </NumberButton>
      );
    }
    return numbers;
  };

  return (
      <NumberContainer>{renderNumbers()}</NumberContainer>
  );
}

export default NumberSelector;


const NumberContainer = styled.div`
  display: flex;
  padding: 0 0.5rem;
  gap: 1rem;
`;

const NumberButton = styled.button`
  color: black;
  background-color: white;
  border-radius: 100%;
  border: 0.1rem solid #3A86FF;
  padding: 0.5rem 0.8rem;
  transition: background-color 0.3s; // 배경색 애니메이션

  &:hover {
    background-color: #3A86FF;
  }

  &.selected {
    background-color: #3A86FF;
  }
`