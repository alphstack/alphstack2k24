import { virtualize } from 'react-swipeable-views-utils';
import NavBar from "../components/NavBar";
import { StarsComponent } from "../components/StarComponent";
import React, { useState, useEffect, useRef } from "react";
import SwipeableViews from "react-swipeable-views";
import {CalendarPlus} from 'lucide-react'
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  function slideRenderer ({ index, key }) {
      switch (index) {
        case 0:
          return (
            <div key={key} class="w-screen h-screen bg-white">
              <NavBar navType={1} setSlideIndex={setSlideIndex}/>
              <div className={`h-[calc(100vh-96px)] w-screen`}>
      {currentIndex === 0 && (
        <div className="flex flex-col items-center justify-start h-full pt-10">
          <div className="w-1/3 bg-gray-100 p-5 rounded shadow min-h-[125px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">My Tasks</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center mb-2 cursor-pointer text-gray-700" onClick={() => openTaskDetails(task)}>
                  <span>{task.title}</span>
                </li>
              ))}
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
          <div ref={modalRef} className="bg-white p-5 rounded shadow-lg">
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
        <CalendarPlus />
      </button>
    </div>
            </div>
          )
        case 1:
        return (
          <div key={key} class="w-screen h-screen bg-black overflow-y-hidden">
            <StarsComponent particleAmount={100}/>
          </div>
        )
      }
    }
  
  const modalRef = useRef();

  const addTask = () => {
    if (newTaskTitle) {
      setTasks([...tasks, { title: newTaskTitle }]);
      setNewTaskTitle("");
      setIsNewTaskModalOpen(false);
    }
  };

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
      <div className="h-full">
        <VirtualizeSwipeableViews enableMouseEvents slideCount={2} slideRenderer={slideRenderer} index={slideIndex} onChangeIndex={handleChangeIndex}/>  
      </div>
  );
};

export default Home;
