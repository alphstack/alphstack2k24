import { virtualize } from 'react-swipeable-views-utils';
import NavBar from "../components/NavBar";
import { StarsComponent } from "../components/StarComponent";
import WelcomePage from "./WelcomePage"
import React, { useState, useEffect, useRef } from "react";
import SwipeableViews from "react-swipeable-views";
import {CalendarPlus} from 'lucide-react'
import { useAuthContext } from '../hooks/useAuthContext';
import cons1 from "../assets/cons3.png"
import { Error } from './SignIn';
const VirtualizeSwipeableViews = virtualize(SwipeableViews);
const Home = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const today = new Date();
  const [puncte, setPuncte] = useState(0);

  const countPoints = async() =>{
      const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/countPoints`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user.username})
      })
      const json = await response.json();
      if(!response.ok)
        console.log(json.error);
      if(response.ok){
        setPuncte(json.points);
        console.log(json.points);
      }
  }

  useEffect(() =>{
    if(user)
      countPoints();  
  }, [user])

  const handleUndo = async (taskId) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/markTaskAsUndone`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, taskId: taskId})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setTasks(json.tasks);
    }
  }
  const handleDone = async (taskId) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/markTaskAsDone`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, taskId: taskId})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setTasks(json.tasks);
      setPopup({
        visible: true,
        message: `Congratulations! You earned ${json.points || 0} ⭐`,
      });

      // Ascunde popup-ul după 3 secunde
      setTimeout(() => {
        setPopup({ visible: false, message: '' });
      }, 3000);
    }
  }
  const handleDeleteTask = async (taskId) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/deleteTask`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, taskId: taskId})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setTasks(json.tasks);
    }
  }

  const getTasks = async (req, res) =>{
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/getTasks`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
    }
    if(response.ok){
      console.log(json.tasks);
      setTasks(json.tasks);
    }
  } 

  useEffect(() => {
    if(user)
      getTasks();
  }, [user]);

  function insertTask(newItem) {
    let array = tasks;
    let low = 0;
    let high = array.length;
  
    // Perform binary search to find the correct position
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (array[mid]["timestamp"] < newItem["timestamp"]) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
  
    // Insert the new item at the found position
    array.splice(low, 0, newItem);
    setTasks(array);
  }
  
  const addTask = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/tasks/createTask`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: user.username, prompt: newTaskTitle})
    })
    const json = await response.json();
    if(!response.ok){
      console.log(json.error);
      setError(json.error);
      setTimeout(() =>{
        setError(null);
      }, 7000)
    }
    if(response.ok){
      console.log(json.task);
      insertTask(json.task);
      setNewTaskTitle("");
      setIsNewTaskModalOpen(false);
    }
  };

  function slideRenderer ({ index, key }) {
      switch (index) {
        case 0:
          return (
            <div key={key} class="w-screen h-screen bg-white" style={{ backgroundImage: `url(${cons1})`, backgroundSize: 'contain', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'}}>
              <NavBar navType={1} setSlideIndex={setSlideIndex}/>
              <div className={`h-[calc(100vh-96px)] w-screen`}>
              {error && <Error error={error}/>}
      {currentIndex === 0 && (
        <div className="flex flex-col items-end justify-start h-full pt-10 px-10 sm:px-36">
          <div className="w-full sm:w-2/3 xl:w-1/3 bg-gray-100 p-5 rounded shadow min-h-[125px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">My Tasks</h2>
            <ul>
              {tasks.map((task, index) => {
                const isPastDate = new Date(task.taskDeadline) < today;
                return(
                <div className='flex flex-row justify-between items-center'>
                  <li key={index} className="flex items-center mb-2 cursor-pointer text-gray-700" onClick={() => openTaskDetails(task)}>
                    <span>{task.taskEmoji}</span> <span>{task.taskName} <span className={` ${task.completed ? 'text-green-500' : 'text-red-500'}`}>{task.taskDeadline}</span></span>
                  </li>
                  <div className="flex items-center space-x-1">
                      </div>
                      <div className="flex items-center space-x-2">
                      {task.completed && !isPastDate && (
                        <button
                          className="rounded px-2 py-1 text-xs font-semibold bg-green-100 text-green-800"
                          onClick={() => handleUndo(task.taskId)}
                        >
                          Undo
                        </button>
                      )}
                      {!task.completed && !isPastDate && (
                        <button
                          className={`rounded px-2 py-1 text-xs font-semibold ${
                            isPastDate
                              ? 'bg-red-700 text-white'
                              : 'bg-red-100 text-red-800'
                          }`}
                          onClick={() =>
                            isPastDate
                              ? null
                              : handleDone(task.taskId)
                          }
                        >
                          {isPastDate ? 'Failed' : 'Mark as Done'}
                        </button>
                      )}
                      {task.completed && (
                        <button
                          className="text-yellow-500 hover:text-yellow-700"
                          title={`Set Points (${task.points || 0})`}
                        >
                          ⭐ {task.points || 0}
                        </button>
                      )}
                      {!task.completed && !isPastDate && (
                        <button
                          className="text-gray-400 hover:text-gray-700"
                          onClick={() => handleDeleteTask(task.taskId)}
                          title="Delete Task"
                        >
                          🗑️
                        </button>
                      )}
                    </div>

                </div>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>
          </div>
        </div>
      )}

      {isNewTaskModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-center">New Task</h2>
            <input
              type="text"
              placeholder="I want to lose 5kg by next month"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="block w-full mb-2 p-2 border-2 border-gray-300 rounded hover:border-gray-500 transition duration-300"
            />
            <button onClick={addTask} className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300">
             Add Task
            </button>
          </div>
        </div>
      )}

      <button
        onClick={openNewTaskModal}
        className="fixed bottom-5 right-5 px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
      >
        <CalendarPlus size={30} />
      </button>
    </div>
            </div>
          )
        case 1:
        return (
          <div key={key} class="w-screen h-screen bg-black overflow-y-hidden">
            <StarsComponent particleAmount={puncte}/>
          </div>
        )
      }
    }
  
  const modalRef = useRef();

  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const openNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
  };

  const closeNewTaskModal = () => {
    setIsNewTaskModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
      closeNewTaskModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeIndex = (index) => {
      setSlideIndex(index);
      console.log("new indx: "+index);
      };
  
  return (
    <div>
      {user && <div className="h-full">
        <VirtualizeSwipeableViews enableMouseEvents slideCount={2} slideRenderer={slideRenderer} index={slideIndex} onChangeIndex={handleChangeIndex}/>  
      </div>}
      {!user && 
        <div>
          <NavBar/>
          <WelcomePage/>
        </div>
      }
    </div>
  );
};

export default Home;
