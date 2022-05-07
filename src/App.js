import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  const baseUrl = "http://localhost:5000/tasks"


  

  //!CRUD create read update  ve Delete CRUD baş harflerin kısaltması

  //!Fetch Task

  // const fetchTask = async () => {
  //   try {const res = await fetch(baseUrl);
  //   const data = await res.json();
  //   console.log(data);

  //   setTasks(data)}
  //   catch(err){
  //     console.log(err);
  //   }
  // }

  //!AXİOS 

  const fetchTask = async ()=>{
    //const res = await axios.get(baseUrl)
    const {data} = await axios.get(baseUrl)
    console.log(data);
    setTasks(data)
  }



  useEffect(() => {
    fetchTask()

  }, [])



  //! DELETE TASK
  // const deleteTask = (deletedTaskId) => {
  //   // console.log("delete Task", deletedTaskId);
  //   setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  // };

  //!!AXİOS İLE DELETE TASK

  const deleteTask = async (deletedTaskId)=>{
    console.log(deletedTaskId);
 // await axios.delete(`${ baseUrl}/${deletedTaskId}`)

 //?back tic olmadan böyle yaparız
  await axios.delete( baseUrl+"/"+deletedTaskId)
  fetchTask()

  }


  
  //! ADD TASK
  // const addTask = (newTask) => {
  //   const id = Math.floor(Math.random() * 1000 + 1);
  //   const addNewTask = { id, ...newTask };
  //   setTasks([...tasks, addNewTask]);
  // };

  //!! ADD TASK FETCH İLE

  // const addTask = async(newTask)=>{
  //   const res = await fetch(baseUrl,{
  //     method: 'POST',  
  //     headers: {
  //       'Content-Type': 'application/json'
  //      },
  //     body: JSON.stringify(newTask) 
  //   })
  //   await res.json();
  //   console.log(res);
  //   fetchTask()
  // }


  //!!AXİOS İLE ADD TASK

  const addTask = async(newTask) =>{
    
   // const res =  await axios.post(baseUrl,newTask)
   // const {data} =  await axios.post(baseUrl,newTask)
   await axios.post(baseUrl,newTask)
   // console.log(data);
    fetchTask()

  }




  //! TOGGLE DONE
  // const toggleDone = (toggleDoneId) => {
  //   // console.log("double click", toggleDoneId);
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === toggleDoneId ? { ...task, isDone: !task.isDone } : task
  //     )
  //   );
  // };


  //!! TOGGLE DONE AXİOS İLE ******UPDATE******

  const toggleDone = async(toggleDoneId)=>{

    //?BU  URL SONUNDA İD VERDİK VE DATA DAN SADECE O İD İ ÇAĞIRDIK
    const {data} = await axios.get(baseUrl+"/"+toggleDoneId)

   // const updateTask = {...data, isDone:!data.isDone}

    //? put edit yapıyor mevcut data nın isDone özelliği false oluyor ve 
    //await axios.put(baseUrl+"/"+toggleDoneId,updateTask)

    //?PATCH İLE DATA YI EDİT ETTİK YAMA YAPIYRUZ BÜTÜN DATAYI GÖNDERMEDİK SADECE DEĞİŞEN İD Yİ DEĞİŞTİRDİK
    await axios.patch(baseUrl+"/"+toggleDoneId,{isDone:!data.isDone,day:data.day+data.day})
    fetchTask()

  }




  // TOGGLESHOW
  const toggleShow = () => setShowAddTask(!showAddTask);

  return (
    <div className="container">
      <Header
        title="TASK TRACKER"
        showAddTask={showAddTask}
        toggleShow={toggleShow}
      />

      {showAddTask && <AddTask addTask={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone} />
      ) : (
        <h2 style={{ textAlign: "center" }}>NO TASK TO SHOW</h2>
      )}
    </div>
  );
}

export default App;
