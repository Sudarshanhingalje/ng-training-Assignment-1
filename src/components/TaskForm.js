import React, { useState, useEffect } from 'react';
import './TaskForm.css';

// TaskForm Component: A form for creating or editing tasks
const TaskForm = ({ task, onSave, onCancel }) => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: '',  // This will also be reflected in the comments section as "description"
  });

  // Effect to populate form data when editing an existing task
  useEffect(() => {
    if (task) {
      setFormData(task);  
    }
  }, [task]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  // Handles date input changes
  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      dueDate: value,
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Call the onSave prop with the updated task data
    onSave({
      ...formData,
      id: task ? task.id : Date.now(), // If editing, keep the task ID; otherwise create a new one
    });
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Input for Assigned To */}
          <div className="form-group">
            <label htmlFor="assignedTo">Assigned To</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dropdown for Status */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Date Input for Due Date */}
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleDateChange}
              required
            />
          </div>

          {/* Dropdown for Priority */}
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Textarea for Description (Will Show in Comments Section) */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (will appear in comments)"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
