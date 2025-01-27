/**
 *
 * UserList
 *
 */

import React from 'react';

import { dateFormat } from '../../../helpers';
import UserRole from '../UserRole';

const UserList = (props) => {
  const { users } = props;

  return (
    <div className="u-list">
      <p className="fw-1">{users.length} results</p>
      {users.map((user, index) => (
        <div key={index} className="mt-3 px-4 py-3 user-box">
          <label className="text-black">Name</label>
          <p className="fw-2">{user?.name ? `${user?.name}` : 'N/A'}</p>
          <label className="text-black">Email</label>
          <p>{user?.email}</p>
          <label className="text-black">Account Created</label>
          <p>{dateFormat(user?.created)}</p>
          <label className="text-black">Role</label>
          <p className="mb-0">
            <UserRole user={user} className="d-inline-block mt-2" />
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
