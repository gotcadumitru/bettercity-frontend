import React, { useEffect, useRef } from 'react';

const TextArea = ({ inputLabel, value, errorMessage, className, ...props }) => {
  const inputDateRef = useRef(null);
  useEffect(() => {
    inputDateRef.current.style.height = '5px';
    inputDateRef.current.style.height = inputDateRef.current?.scrollHeight + 'px';
  }, [value]);

  return (
    <>
      {inputLabel && <div className="input__label">{inputLabel}</div>}
      <textarea className={`textarea ${errorMessage ? 'textarea--error' : ''} ${className}`} ref={inputDateRef} value={value} {...props} />
      {errorMessage && <div className="input__error">{errorMessage} </div>}
    </>
  );
};

export default TextArea;
