import React from 'react';

import { Routes } from './routes/Routes';
import {AppWriteProvider} from '../src/app_write/AppWriteContext'

function App(): React.JSX.Element {
  return (
    <AppWriteProvider>
    <Routes/>
    </AppWriteProvider>
  );
}

export default App;
