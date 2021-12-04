import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../../common/components/common/Input';
import { authToken } from '../../../common/helpers/token';
import { fetchAllIssuesThunk } from '../../../common/state/thunk/issue.thunk';
import IssueCard from '../IssueCard/IssueCard';
const Issues = ({ ...props }) => {
  const [inputData, handleInputData] = useState('');
  const allIssues = useSelector((state) => state.issue.allIssues);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllIssuesThunk());
    // eslint-disable-next-line
  }, []);
  const handleInput = () => {
    const handleChangeInput = (e) => {
      handleInputData(e.target.value);
    };
    return <Input placeholder="Search..." onChange={handleChangeInput} />;
  };
  const handleNewButton = () => {
    const onButtonClick = (e) => {};
    return (
      <Link to={authToken.getToken() ? '/auth/login' : '/issues/new'}>
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
      <div className="section__body section__body--issues">
        {allIssues
          .filter((issue) => `${issue.title} ${issue.status} ${issue.description}`.toLowerCase().includes(inputData.toLowerCase()))
          .sort((issue1, issue2) => new Date(issue2.createdAt).getTime() - new Date(issue1.createdAt).getTime())
          .map((issue) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              likes={2500}
              title={issue.title}
              status={issue.status}
              image={issue.pictures?.length ? issue?.pictures[0].link : 'https://www.yiiframework.com/image/issues/issues.svg'}
              description={issue.description}
            />
          ))}
      </div>
    </div>
  );
};
export default Issues;
