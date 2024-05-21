import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import { BranchProvider } from './BranchContext';

import Button from "./Button";

function App() {
  return (
    <BranchProvider>
      <div className="App">
        <Helmet>
          <title>Branch.io test</title>
        </Helmet>
        <Button>Do Something</Button>
      </div>
    </BranchProvider>
  );
}

export default App;
