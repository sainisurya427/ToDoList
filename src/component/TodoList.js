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



 
