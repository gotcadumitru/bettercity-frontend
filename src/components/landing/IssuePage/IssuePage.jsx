import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { CgEditBlackPoint } from 'react-icons/cg';
import { fetchSingleIssueThunk } from '../../../common/state/thunk/issue.thunk';
const IssuePage = ({ ...props }) => {
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issue.issue);
  const { id } = useParams();
  const [activeImage, handleActiveImage] = useState('https://www.yiiframework.com/image/issues/issues.svg');

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleIssueThunk(id));
    }
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (issue?.pictures?.length) {
      handleActiveImage(issue.pictures[0]);
    }
  }, [issue]);
  if (!issue) {
    return <div className="empty-page" />;
  }
  return (
    <div className="section">
      <div className="section__header section__header--space-between">
        <div className="section__title">{issue.title}</div>
      </div>
      <div className="section__body">
        <div className="issue-page">
          <div className="issue-page__body">
            <div className="slider">
              {activeImage && <div style={{ backgroundImage: 'url(' + activeImage + ')' }} className="slider__main-image" alt="" />}
              <div className="slider__points">
                {issue.pictures?.map((picture, index) => (
                  <CgEditBlackPoint
                    onClick={() => handleActiveImage(picture)}
                    key={index}
                    className={`slider__point ${picture === activeImage ? 'slider__point--active' : ''}`}
                  />
                ))}
              </div>
              <BsFillArrowRightCircleFill
                onClick={() => {
                  const imageIndex = issue.pictures.indexOf(activeImage);
                  if (imageIndex === issue.pictures.length - 1) {
                    handleActiveImage(issue.pictures[0]);
                  } else {
                    handleActiveImage(issue.pictures[imageIndex + 1]);
                  }
                }}
                className="slider__right-icon"
              />
              <BsFillArrowLeftCircleFill
                onClick={() => {
                  const imageIndex = issue.pictures.indexOf(activeImage);
                  if (imageIndex === 0) {
                    handleActiveImage(issue.pictures[issue.pictures.length - 1]);
                  } else {
                    handleActiveImage(issue.pictures[imageIndex - 1]);
                  }
                }}
                className="slider__left-icon"
              />
            </div>
            <div className="issue-page__data">d</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssuePage;
