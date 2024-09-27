import React, { useState } from 'react';
import './TaskList.css';

// TaskList Component: Displays a list of tasks with search, select, edit, and delete functionalities
const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  // State to manage dropdown visibility for editing tasks
  const [dropdownTaskId, setDropdownTaskId] = useState(null);
  // State to manage a counter (not directly related to tasks)
  const [counter, setCounter] = useState(0);
  // State to manage the search term for filtering tasks
  const [searchTerm, setSearchTerm] = useState('');
  // State to manage the select all checkbox functionality
  const [selectAll, setSelectAll] = useState(false);
  // State to track selected tasks
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Toggles the visibility of the dropdown for a specific task
  const handleDropdownToggle = (taskId) => {
    setDropdownTaskId(dropdownTaskId === taskId ? null : taskId);
  };

  // Increments or decrements the counter
  const handleCounterChange = (direction) => {
    setCounter(direction === 'up' ? counter + 1 : counter - 1);
  };

  // Updates the search term based on user input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handles the select all checkbox functionality
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedTasks(isChecked ? tasks.map((task) => task.id) : []);
  };

  // Toggles the selection of a single task
  const handleSelectTask = (taskId) => {
    setSelectedTasks(prevSelectedTasks =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId) // Deselect
        : [...prevSelectedTasks, taskId] // Select
    );
  };

  // Deletes selected tasks after user confirmation
  const handleDeleteTasks = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} tasks?`)) {
      onDeleteTask(selectedTasks);
      setSelectedTasks([]);
    }
  };

  // Refreshes the page
  const handleRefresh = () => {
    window.location.reload();
  };

  // Filters tasks based on the search term
  const filteredTasks = tasks.filter((task) => {
    const searchTermLowercase = searchTerm.toLowerCase();
    return (
      task.assignedTo.toLowerCase().includes(searchTermLowercase) ||
      task.status.toLowerCase().includes(searchTermLowercase) ||
      task.priority.toLowerCase().includes(searchTermLowercase) ||
      task.comments.toLowerCase().includes(searchTermLowercase)
    );
  });

  return (
    <div className="task-list">
      {/* Task List Header */}
      <div className="task-header">
        <div className="title-container">
          <div className="icon">☰</div>
          <div className="title">
            <h2>Tasks</h2>
            <span>All Tasks</span>
          </div>
        </div>
        <div className="task-actions">
          <button className="refresh" onClick={handleRefresh}>Refresh</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-icon"><span role="img" aria-label="search">🔍 </span></button>
      </div>

      {/* Task Table */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleSelectTask(task.id)}
                />
              </td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                {/* Dropdown for Edit and Delete Actions */}
                <div className="dropdown">
                  <button onClick={() => handleDropdownToggle(task.id)}>▼</button>
                  {dropdownTaskId === task.id && (
                    <div className="dropdown-content">
                      <button onClick={() => onEditTask(task)}>Edit</button>
                      <button onClick={() => onDeleteTask(task)}>Delete</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button>▴ First</button>
        <button>{'< Prev'}</button>
        <span>1</span>
        <button>{'Next >'}</button>
        <button>Last {'\u25BC'}</button>
      </div>

      {/* Counter Controls */}
      <div className="counter">
        <button onClick={() => handleCounterChange('down')}>▼</button>
        <span>{counter}</span>
        <button onClick={() => handleCounterChange('up')}>▲</button>
      </div>

      {/* Delete Selected Tasks Button */}
      {selectedTasks.length > 0 && (
        <div className="delete-button">
          <button onClick={handleDeleteTasks}>Delete Selected Tasks</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
