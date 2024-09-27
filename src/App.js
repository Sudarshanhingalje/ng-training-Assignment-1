import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import TaskService from './services/TaskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await TaskService.getTasks();
    setTasks(fetchedTasks);
  };

  const handleAddTask = (newTask) => {
    TaskService.addTask(newTask).then(() => {
      fetchTasks();
      setIsNewTaskFormOpen(false);
    });
  };

  const handleEditTask = (updatedTask) => {
TaskService.updateTask(updatedTask).then(() => {
      fetchTasks();
      setEditingTask(null);
    });
  };

  const handleDeleteTask = (taskId) => {
    TaskService.deleteTask(taskId).then(() => {
      fetchTasks();
      setDeletingTask(null);
    });
  };

  return (
    <div className="App">
      <div className="task-controls">
        <button onClick={() => setIsNewTaskFormOpen(true)}>New Task</button>
      </div>
      <TaskList
        tasks={tasks}
        onEditTask={setEditingTask}
        onDeleteTask={setDeletingTask}
      />
      {isNewTaskFormOpen && (
        <TaskForm
          onSave={handleAddTask}
          onCancel={() => setIsNewTaskFormOpen(false)}
        />
      )}
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSave={handleEditTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
      {deletingTask && (
        <DeleteConfirmation
          task={deletingTask}
          onConfirm={() => handleDeleteTask(deletingTask.id)}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
}

export default App;