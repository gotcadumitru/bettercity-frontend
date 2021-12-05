import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { FiUsers } from 'react-icons/fi';
import { GoIssueOpened } from 'react-icons/go';
import { AiOutlineBulb } from 'react-icons/ai';
import { BiMapAlt, BiStats } from 'react-icons/bi';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import useClickOutside from '../../hooks/useClickOutside';
const Sidebar = (props) => {
  const location = useLocation().pathname.split('/')[1];
  const [isSidebarOpen, handleIsSidebarOpen] = useState(window.innerWidth > 800);
  const { width } = useWindowSize();
  const sidebarRef = useRef();
  useEffect(() => {
    if (width < 800) {
      handleIsSidebarOpen(false);
    }

    if (width >= 800) {
      handleIsSidebarOpen(true);
    }
  }, [width]);
  const navItems = [
    { Icon: FiUsers, name: 'contributors', forAdmin: true },
    { Icon: GoIssueOpened, name: 'issues', forAdmin: false },
    { Icon: AiOutlineBulb, name: 'suggestions', forAdmin: false },
    { Icon: BiMapAlt, name: 'map', forAdmin: false },
    { Icon: BiStats, name: 'statistics', forAdmin: false },
  ];

  useClickOutside(sidebarRef, () => {
    if (width < 800) {
      handleIsSidebarOpen(false);
    }
  });
  return (
    <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'sidebar--open' : 'sidebar--close'}`}>
      <img className="sidebar__logo" src={logo} alt="BETTER CITY" />
      <hr className="sidebar__line" />
      {!isSidebarOpen && (
        <div onClick={() => handleIsSidebarOpen(true)} className="burger">
          <div className="burger-lines" />
        </div>
      )}
      {navItems.map(({ Icon, name }) => (
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
