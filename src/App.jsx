import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profiles from './Profiles';
import CrudOperations from './Components/CrudOperations';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CrudOperations />} />
      <Route path="/profiles" element={<Profiles />} />
    </Routes>
  );
};

export default App;
