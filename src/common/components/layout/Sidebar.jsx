import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { FiUsers } from 'react-icons/fi';
import { GoIssueOpened } from 'react-icons/go';
import { AiOutlineBulb } from 'react-icons/ai';
import { BiMapAlt } from 'react-icons/bi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import useClickOutside from '../../hooks/useClickOutside';
const Sidebar = (props) => {
  const location = useLocation().pathname.split('/')[1];
  const isAdmin = !useSelector((state) => state.profileInfo.user.data.role === 'admin');
  const [isSidebarOpen, handleIsSidebarOpen] = useState(true);
  const { width } = useWindowSize();
  const sidebarRef = useRef();
  useEffect(() => {
    if (width < 800) {
      handleIsSidebarOpen(false);
    }
  }, [width]);
  const navItems = [
    { Icon: FiUsers, name: 'users', forAdmin: true },
    { Icon: GoIssueOpened, name: 'issues', forAdmin: false },
    { Icon: AiOutlineBulb, name: 'suggestions', forAdmin: false },
    { Icon: BiMapAlt, name: 'map', forAdmin: false },
  ];

  useClickOutside(sidebarRef, () => handleIsSidebarOpen(false));
  return (
    <div ref={sidebarRef} className={`sidebar ${width < 800 ? (isSidebarOpen ? 'sidebar--open' : 'sidebar--close') : ''}`}>
      <img className="sidebar__logo" src={logo} alt="BETTER CITY" />
      <hr className="sidebar__line" />
      {!isSidebarOpen && (
        <div onClick={() => handleIsSidebarOpen(true)} className="burger">
          <div className="burger-lines" />
        </div>
      )}
      {navItems
        .filter(({ forAdmin }) => !forAdmin || isAdmin)
        .map(({ Icon, name }) => (
          <Link
            key={name}
            onClick={() => {
              if (width < 800 && isSidebarOpen) {
                handleIsSidebarOpen(false);
              }
            }}
            to={`/${name}`}
            className={`sidebar__item ${location === name ? 'sidebar__item--active' : ''}`}
          >
            <Icon className="sidebar__icon" /> {name}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
