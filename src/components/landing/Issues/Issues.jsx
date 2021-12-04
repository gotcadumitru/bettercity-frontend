import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../common/components/common/Input';
import { ISSUE_STATUS } from '../../../common/defaults/defaults.issue';
import IssueCard from '../IssueCard/IssueCard';
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
      <Link to="/issues/new">
        <button className="button" onChange={onButtonClick}>
          + New Issue
        </button>
      </Link>
    );
  };
  return (
    <div className="section">
      <div className="section__header section__header--space-between">
        {handleNewButton()}
        {handleInput()}
      </div>
      <div className="section__body">
        <IssueCard
          id={0}
          likes={2500}
          title={'Issue Title'}
          status={ISSUE_STATUS.IN_PROGRESS}
          image={'https://i.imgur.com/lwqBCGX.jpeg'}
          description="Loren lo ddada wdaw dawdLoren daw lo ddadaw daw dawdL en lo ddadawdaw dawdL orendaw lo ddad awdawddadawdaw dawdLo rendaw lo ddadaw daw dawdLoren lo dd adawdaw dawdLoren lo ddadawdaw dawdLoren lo ddaddawd awdaw dawdLoren lo ddadawdaw dawd"
        />
      </div>
    </div>
  );
};
export default Issues;
