import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const TaskService = {
  getTasks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  addTask: async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  updateTask: async (updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${updatedTask.id}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default TaskService;