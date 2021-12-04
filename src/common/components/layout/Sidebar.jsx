import React from 'react';
import logo from '../../../assets/images/logo.png';
import { FiUsers } from 'react-icons/fi';
import { GoIssueOpened } from 'react-icons/go';
import { AiOutlineBulb } from 'react-icons/ai';
import { BiMapAlt } from 'react-icons/bi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Sidebar = (props) => {
  const location = useLocation().pathname.split('/')[1];
  const isAdmin = !useSelector((state) => state.profileInfo.user.data.role === 'admin');
  const navItems = [
    { Icon: FiUsers, name: 'users', forAdmin: true },
    { Icon: GoIssueOpened, name: 'issues', forAdmin: false },
    { Icon: AiOutlineBulb, name: 'suggestions', forAdmin: false },
    { Icon: BiMapAlt, name: 'map', forAdmin: false },
  ];

  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logo} alt="BETTER CITY" />
      <hr className="sidebar__line" />
      {navItems
        .filter(({ forAdmin }) => !forAdmin || isAdmin)
        .map(({ Icon, name }) => (
          <Link key={name} to={`/${name}`} className={`sidebar__item ${location === name ? 'sidebar__item--active' : ''}`}>
            <Icon className="sidebar__icon" /> {name}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
