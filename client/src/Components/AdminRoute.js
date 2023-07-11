import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

function AdminRoute({ path, children }) {
  if (isAdmin()) {
    return (
      <Route path={path}>
        {children}
      </Route>
    )
  } else {
    alert('권한이 없습니다. 죄송합니다.');
    return (
      <Redirect to='/' />
    )
  }
}

export default AdminRoute