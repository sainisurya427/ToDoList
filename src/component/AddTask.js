 // src/component/AddTask.js
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

function AddTask({ todoListId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const addTask = async () => {
    try {
      await addDoc(collection(db, `todoLists/${todoListId}/tasks`), {
        title,
        description,
        dueDate,
        priority,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h4>Add Task</h4>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default AddTask;
