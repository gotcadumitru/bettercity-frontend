import React from 'react';

const Input = ({ inputLabel, errorMessage, className = '', ...props }) => {
  return (
    <div>
      {inputLabel && <div className="input__label">{inputLabel}</div>}
      <input className={`input ${errorMessage ? 'input--error' : ''} ${className}`} {...props} />
      {errorMessage && <div className="input__error">{errorMessage} </div>}
    </div>
  );
};
export default Input;
