// import React from 'react';
// import SimpleJSX from './components/SimpleJSX';
// import DisplayArray from './components/DisplayArray';
// import ShowHideElement from './components/ShowHideElement';
// import EnableDisableButton from './components/EnableDisableButton';
// import TwoWayBinding from './components/TwoWayBinding';
// import AddChildComponent from './components/AddChildComponent';
// import SumOfTwoNumbers from './components/SumOfTwoNumbers';
// import Counter from './components/Counter';
// import SearchFilter from './components/SearchFilter';
// import DataGridComponent from './components/DataGridComponent';
// import TaskList from './components/TaskList';
 


// function App() {
//   return (
//     <div className="App">
//       <h1>React Learning Tasks</h1>
//       <SimpleJSX />
//       <DisplayArray />
//       <ShowHideElement />
//       <EnableDisableButton />
//       <TwoWayBinding />
//       <AddChildComponent />
//       <SumOfTwoNumbers />
//       <Counter />
//       <SearchFilter />
//       <DataGridComponent />
//       <h1>Task List with Drag and Drop</h1>
//       <TaskList/>
//     </div>
//   );
// }

// export default App;




 



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
