// leaderboard-frontend/src/components/UserManagement.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function UserManagement({ onUserAdded }) {
    const [newUserName, setNewUserName] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleAddUser = async () => {
        if (!newUserName.trim()) {
            setMessage('User name cannot be empty!');
            setIsError(true);
            return;
        }
        try {
            await axios.post(`${API_URL}/users`, { name: newUserName });
            setMessage(`User '${newUserName}' added successfully!`);
            setIsError(false);
            setNewUserName('');
            onUserAdded(); // Notify parent to refresh data
        } catch (err) {
            console.error('Error adding user:', err);
            setMessage(err.response?.data?.msg || 'Failed to add user. Try a different name.');
            setIsError(true);
        }
    };

    return (
        <div>
            <h3>Add New User</h3>
            <input
                type="text"
                placeholder="Enter new user name"
                value={newUserName}
                onChange={(e) => {
                    setNewUserName(e.target.value);
                    setMessage(''); // Clear message on input change
                }}
            />
            <button onClick={handleAddUser}>Add User</button>
            {message && (
                <p className={isError ? 'error-message' : 'success-message'}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default UserManagement;