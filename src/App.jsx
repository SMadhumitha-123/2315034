import React,{useState,useEffect}from"react";
import axios from "axios";
import "./App.css";
const Log = async (layer,level,type,msg) => {
  console.log(`[${layer.toUpperCase()}] [${level.toUpperCase()}] ${type}: ${msg}`);
};
export function App() 
{
  const [update,setUpdate]=useState([]);
  const [message,setMessage]=useState("");
  const [editId,setEditId]=useState(null);
  const [tasks, setTasks]=useState([]);
  const fetchTasks = async() => {
    const res=await axios.get("http://localhost:3000/notify");
    setUpdate(res.data);
    await Log("frontend","info","api","Fetched info");
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const handleSubmit=async() => {
    if(!update||!message) 
    {
      await Log("frontend","error","component","Empty fields");
      return;
    }
    if (editId){
      await axios.put(`http://localhost:3000/notify/${editId}`, {
        update,
        message,
      });
      await Log("frontend","warn","component","Info updated");
      setEditId(null);
    } 
    else 
      {
      await axios.post("http://localhost3000/notify", {
        update,
        message,
      });
      await Log("frontend","info","component","Info created");
    }
    setUpdate("");
    setMessage("");
    fetchTasks();
  };
  const deleteTask=async(id) => {
    await axios.delete(`http://localhost:3000/notify/${id}`);
    await Log("frontend", "error", "component", "Info deleted");
    fetchTasks();
  };
  const editTask=(task) => {
    setUpdate(task.update);
    setMessage(task.message);
    setEditId(task.id);
  };
  return (
    <div className="container">
      <h2>Notifications App</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Enter the type of Updates"
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editId ? "Update Info" : "Add Info"}
        </button>
      </div>
      <ul className="Notifications-list">
        {tasks.map((t) => (
          <li key={t.id} className="notifys">
            <div>
              <strong>{t.update}</strong>
              <p>{t.message}</p>
            </div>
            <div className="buttons">
              <button onClick={() => editTask(t)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;






