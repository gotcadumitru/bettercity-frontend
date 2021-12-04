import React from 'react';
import { Link } from 'react-router-dom';
import { ISSUE_STATUS } from '../../../common/defaults/defaults.issue';
import { BiLike } from 'react-icons/bi';
const ISSUE_STATUS_COLOR = {
  [ISSUE_STATUS.IN_PROGRESS]: '#0074d9',
  [ISSUE_STATUS.RESOLVED]: '#2ecc40',
  [ISSUE_STATUS.REJECTED]: '#ff4136',
  [ISSUE_STATUS.NOT_ASSIGNED]: '#111',
};
const IssueCard = ({ image, title, likes, status, description, id, ...props }) => {
  return (
    <div className="issue-card">
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="issue-card__image"
      />
      <div className="issue-card__body">
        <div className="issue-card__title">{title}</div>
        <div className="issue-card__description">{description}</div>
      </div>
      <div className="issue-card__footer">
        <div className="issue-card__likes">
          <BiLike className="issue-card__like-icon" />
          {likes}
        </div>
        <div className="issue-card__status" style={{ color: ISSUE_STATUS_COLOR[status] }}>
          {status}
        </div>
        <Link to={`/issues/${id}`} className="issue-card__link">
          View
        </Link>
      </div>
    </div>
  );
};
export default IssueCard;
