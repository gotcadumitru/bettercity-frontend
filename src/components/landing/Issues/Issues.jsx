import React, { useState } from 'react';
import Input from '../../../common/components/common/Input';
const Issues = ({ ...props }) => {
  const [inputData, handleInputData] = useState('');
  const handleInput = () => {
    const handleChangeInput = (e) => {
      handleInputData(e.target.value);
    };
    return <Input placeholder="Search..." onChange={handleChangeInput} />;
  };
  const handleNewButton = () => {
    const onButtonClick = (e) => {};
    return (
      <button className="button" onChange={onButtonClick}>
        + New Issue
      </button>
    );
  };
  return (
    <div className="section">
      <div className="section__header section__header--space-between">
        {handleNewButton()}
        {handleInput()}
      </div>
    </div>
  );
};
export default Issues;
