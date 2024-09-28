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
    try {
      const fetchedTasks = await TaskService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await TaskService.addTask(newTask);
      fetchTasks();
      setIsNewTaskFormOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      await TaskService.updateTask(updatedTask);
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      fetchTasks();
      setDeletingTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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