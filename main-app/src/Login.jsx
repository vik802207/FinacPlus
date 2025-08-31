import React from 'react';
import { useAuth } from './AuthContext';
import './Login.css';

export default function Login() {
  const { user, loginAs, logout } = useAuth();

  if (user) {
    return (
      <div className="login-box">
        <div>
          Signed in as <strong>{user.username}</strong> ({user.role})
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="login-box">
      <button onClick={() => loginAs('user')}>Login as USER</button>
      <button onClick={() => loginAs('admin')}>Login as ADMIN</button>
    </div>
  );
}
