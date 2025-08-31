import React, { Suspense } from 'react';

// The remote import path must match the remotes key in vite.config remotes mapping
import RemoteMusic from "remoteApp/MusicLibrary"

export default function RemoteLoader({ role }) {
  return (
    
      <RemoteMusic role={role} />

  );
}
