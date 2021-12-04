import React, { useState } from 'react';
import Input from '../../../common/components/common/Input';
const Users = ({ ...props }) => {
  const [inputData, handleInputData] = useState('');
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
        {[...new Array(30)]
          .filter((m, n) => `${n}`.toLowerCase().includes(inputData.toLowerCase()))
          .map((m, n) => (
            <div key={n} className="user-table__row">
              <div key={n} className="user-table__row-content">
                <div className="user-table__header-item">User Name {n}</div>
                <div className="user-table__header-item">email.addre{n}ss@mail.com</div>
                <div className="user-table__header-item">Role {n}</div>
                <div className="user-table__header-item">Issue {n}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Users;
