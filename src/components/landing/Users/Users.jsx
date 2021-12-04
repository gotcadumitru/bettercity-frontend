import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Input from '../../../common/components/common/Input';
import { fetchAllUsersThunk } from '../../../common/state/thunk/user.thunk';
const Users = ({ ...props }) => {
  const [inputData, handleInputData] = useState('');
  const allUsers = useSelector((state) => state.profileInfo.allUsers.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersThunk());
    // eslint-disable-next-line
  }, []);
  const handleInput = () => {
    const handleChangeInput = (e) => {
      handleInputData(e.target.value);
    };
    return <Input placeholder="Search..." onChange={handleChangeInput} />;
  };
  return (
    <div className="section">
      <div className="section__header">{handleInput()}</div>
      <div className="user-table">
        <div className="user-table__header">
          <div className="user-table__header-item">Full Name</div>
          <div className="user-table__header-item">Email Address</div>
          <div className="user-table__header-item">Role</div>
          <div className="user-table__header-item">Raported Issues</div>
        </div>
        {allUsers
          .filter((user) => `${user.email} ${user.name} ${user?.role}`.toLowerCase().includes(inputData.toLowerCase()))
          .map((user) => (
            <div key={user.id} className="user-table__row">
              <div className="user-table__row-content">
                <div className="user-table__header-item">{user.name}</div>
                <div className="user-table__header-item">{user.email}</div>
                <div className="user-table__header-item">{user.role}</div>
                <div className="user-table__header-item">{user.raportedIssues ?? 0}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Users;
