import React from 'react';
import { createRoot } from 'react-dom/client';
import MusicLibrary from './MusicLibrary';
import './index.css';

createRoot(document.getElementById('root')).render(<MusicLibrary role="admin" />);
