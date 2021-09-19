import React, { useState } from 'react';

export const Button = ({ label, onClick, style = {} }) => {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseDown={() => {
        setPressed(true);
      }}
      onMouseUp={() => {
        setPressed(false);
      }}
      style={{
        ...styles.default,
        ...style.normal,
        ...(hover ? { ...styles.hover, ...style.hover } : null),
        ...(pressed ? { ...styles.pressed, ...style.pressed } : null),
      }}>
      {label}
    </button>
  );
};

const styles = {
  default: {
    margin: 0,
    padding: '8px 12px 8px 12px',
    backgroundColor: '#01182b',
    borderRadius: 4,
    color: 'white',
    border: '0px',
    fontSize: 17,
  },
  hover: {
    backgroundColor: '#263d5c',
  },
  pressed: {
    backgroundColor: '#033863',
  },
};
