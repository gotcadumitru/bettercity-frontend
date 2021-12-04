import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../selectors/selectors';

const Header = (props) => {
  const user = useSelector(getCurrentUser);

  return <div className='header'>Header {`${user.name} ${user.surname}`}</div>;
};

export default Header;
