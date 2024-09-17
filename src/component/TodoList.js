 // src/components/TodoList.js
import { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import AddTask from './AddTask';

function TodoList() {
  const [todoLists, setTodoLists] = useState([]);
  const [listName, setListName] = useState("");

  // Fetch To Do Lists for logged-in user
  useEffect(() => {
    const q = query(collection(db, "todoLists"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodoLists(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  // Add new To Do List
  const addTodoList = async () => {
    try {
      await addDoc(collection(db, "todoLists"), {
        name: listName,
        userId: auth.currentUser.uid
      });
      setListName("");
    } catch (error) {
      console.error("Error adding To Do List:", error);
    }
  };

  return (
    <div>
      <h2>To Do Lists</h2>
      <input type="text" placeholder="List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
      <button onClick={addTodoList}>Add List</button>
      <ul>
        {todoLists.map(list => (
          <li key={list.id}>
            <h3>{list.name}</h3>
            <AddTask todoListId={list.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;



// // src/component/TodoList.js

// import React, { useEffect, useState } from 'react';
// import { db } from '../firebaseConfig'; // Import db from firebaseConfig
// import { collection, getDocs } from 'firebase/firestore'; // Firestore methods

// const TodoList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'tasks'));
//         const tasksArray = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTasks(tasksArray);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>{task.taskName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;


// src/component/TodoList.js

// import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebaseConfig';

// const TodoList = () => {
//   const [user] = useAuthState(auth);

//   if (!user) {
//     return <div>You need to log in to view this page.</div>;
//   }

//   // Your todo list code here
//   return (
//     <div>
//       <h1>Your To-Do List</h1>
//       {/* Display tasks and functionality */}
//     </div>
//   );
// };

// export default TodoList;
