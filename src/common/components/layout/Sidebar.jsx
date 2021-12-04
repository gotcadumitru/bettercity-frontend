import React from 'react';
import logo from '../../../assets/images/logo.png';
import { FiUsers } from 'react-icons/fi';
import { GoIssueOpened } from 'react-icons/go';
import { AiOutlineBulb } from 'react-icons/ai';
import { BiMapAlt } from 'react-icons/bi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { authToken } from '../../helpers/token';
const Sidebar = (props) => {
  const location = useLocation().pathname.split('/')[1];
  const navItems = [
    { Icon: FiUsers, name: 'users', withAuth: true },
    { Icon: GoIssueOpened, name: 'issues', withAuth: false },
    { Icon: AiOutlineBulb, name: 'suggestions', withAuth: false },
    { Icon: BiMapAlt, name: 'map', withAuth: false },
  ];

  const isUserAuthentificated = !!authToken.getToken();
  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logo} alt="BETTER CITY" />
      <hr className="sidebar__line" />
      {navItems
        .filter(({ withAuth }) => !withAuth || isUserAuthentificated)
        .map(({ Icon, name }) => (
          <Link key={name} to={`/${name}`} className={`sidebar__item ${location === name ? 'sidebar__item--active' : ''}`}>
            <Icon className="sidebar__icon" /> {name}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
