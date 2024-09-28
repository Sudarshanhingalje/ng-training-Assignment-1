import React from 'react';
import './DeleteConfirmation.css';

// DeleteConfirmation Component: Confirms the deletion of a task

function DeleteConfirmation({ task, onConfirm, onCancel })
 {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation">
        {/* Header for Delete Confirmation */}
        <div className="delete-header">Delete</div>
        
        {/* Content for Delete Confirmation */}
        <div className="delete-content">
          <p>Do you want to delete task "{task.description}"?</p>
          
          {/* Action Buttons for Confirmation */}
          <div className="confirmation-actions">
            <button className="btn-no" onClick={onCancel}>No</button>
            <button className="btn-yes" onClick={onConfirm}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
