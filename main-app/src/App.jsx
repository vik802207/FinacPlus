import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import RemoteLoader from './RemoteLoader';
import './index.css';

function Content() {
  const { user } = useAuth();
  const role = user?.role ?? 'user';

  return (
    <div className="host-root">
      <header className="header">
        <h1>Host App — Music MF Demo</h1>
        <Login />
      </header>

      <main>
        <p>Below the remote micro frontend is rendered. Role-based controls appear inside the micro frontend if you're <strong>admin</strong>.</p>
        <RemoteLoader role={role} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  );
}
