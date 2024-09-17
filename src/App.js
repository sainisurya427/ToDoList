 
  // src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './component/Auth/Signup';
import Login from './component/Auth/Login';
import TodoList from './component/TodoList';
import Navbar from './component/Navbar';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="Signup/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={user ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Navigate to={user ? "/todo" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
