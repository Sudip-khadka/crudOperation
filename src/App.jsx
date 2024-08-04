import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profiles from './Profiles';
import CrudOperations from './Components/CrudOperations';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<CrudOperations />} />
      <Route path="/profiles" element={<Profiles />} />
    </Routes>
    </QueryClientProvider>
  );
};

export default App;
