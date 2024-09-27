// This is a mock service. In a real application, you would make API calls here.
const TaskService = {
    tasks: [
      { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-10-12', priority: 'Low', comments: 'This task is good' },
      { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This' },
      { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This' },
      { id: 4, assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This task is good' },
    ],
  
    getTasks: async () => {
      return TaskService.tasks;
    },
  
    addTask: async (task) => {
      const newTask = { ...task, id: Date.now() };
      TaskService.tasks.push(newTask);
      return newTask;
    },
  
    updateTask: async (updatedTask) => {
      const index = TaskService.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        TaskService.tasks[index] = updatedTask;
      }
      return updatedTask;
    },
  
    deleteTask: async (taskId) => {
      TaskService.tasks = TaskService.tasks.filter(t => t.id !== taskId);
    }
  };
  
  export default TaskService;