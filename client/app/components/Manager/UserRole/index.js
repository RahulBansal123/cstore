/**
 *
 * UserRole
 *
 */

import React from 'react';

const UserRole = (props) => {
  const { className, user } = props;

  return (
    <>
      {user.role === 'ADMIN' ? (
        <span className={`role admin ${className}`}>Admin</span>
      ) : user.role === 'SELLER' ? (
        <span className={`role seller ${className}`}>Seller</span>
      ) : (
        <span className={`role member ${className}`}>Member</span>
      )}
    </>
  );
};

UserRole.defaultProps = {
  className: '',
};

export default UserRole;
