import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GiProgression } from 'react-icons/gi';
import { Ri24HoursFill } from 'react-icons/ri';
import { FaUserClock } from 'react-icons/fa';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { fetchStatisticsThunk } from '../../../common/state/thunk/issue.thunk';
const Statistics = ({ ...props }) => {
  const statistics = useSelector((state) => state.issue.statistics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStatisticsThunk());
    // eslint-disable-next-line
  }, []);
  if (!statistics) {
    return <div className="empty-page" />;
  }
  return (
    <div className="section">
      <div className="section__title">Dashboard</div>
      <div className="section__body section__body--stat">
        <div className="stat-card">
          <FaUserClock className="stat-card__icon" />
          <div className="stat-card__content">
            <div className="stat-card__title">Most active user:</div>
            <div className="stat-card__info">{statistics.mostActiveUser.name}</div>
          </div>
        </div>
        <div className="stat-card">
          <BsCheckCircle className="stat-card__icon" />
          <div className="stat-card__content">
            <div className="stat-card__title">Total resolved issues:</div>
            <div className="stat-card__info">{statistics.totalResolvedIssues}</div>
          </div>
        </div>
        <div className="stat-card">
          <GiProgression className="stat-card__icon" />
          <div className="stat-card__content">
            <div className="stat-card__title">In Progress:</div>
            <div className="stat-card__info">{statistics.inProgressIssues}</div>
          </div>
        </div>
        <div className="stat-card">
          <Ri24HoursFill className="stat-card__icon" />
          <div className="stat-card__content">
            <div className="stat-card__title">Issues added in the last 24 hours:</div>
            <div className="stat-card__info">{statistics.issuesAddedInTheLast24Hours}</div>
          </div>
        </div>

        <div className="stat-card">
          <MdOutlineDoNotDisturb className="stat-card__icon" />
          <div className="stat-card__content">
            <div className="stat-card__title">Not assigned issues:</div>
            <div className="stat-card__info">{statistics.notAssignedIssues}</div>
          </div>
        </div>
        <div className="stat-card">
          <FiShoppingBag className="stat-card__icon" />
          <div className="stat-card__content">
            <div className="stat-card__title">Total issues managed in the app:</div>
            <div className="stat-card__info">{statistics.totalIssuesManagedInTheApp}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Statistics;
