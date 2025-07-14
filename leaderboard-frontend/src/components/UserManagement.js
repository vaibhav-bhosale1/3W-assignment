// leaderboard-frontend/src/components/UserManagement.js
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react'; // Example icon

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
            onUserAdded();
        } catch (err) {
            console.error('Error adding user:', err);
            setMessage(err.response?.data?.msg || 'Failed to add user. Try a different name.');
            setIsError(true);
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="new-user-name">New User Name</Label>
                <Input
                    type="text"
                    id="new-user-name"
                    placeholder="Enter new user name"
                    value={newUserName}
                    onChange={(e) => {
                        setNewUserName(e.target.value);
                        setMessage('');
                    }}
                />
            </div>
            <Button onClick={handleAddUser} className="w-full">
                Add User
            </Button>
            {message && (
                <Alert variant={isError ? "destructive" : "default"}>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{isError ? "Error!" : "Success!"}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}

export default UserManagement;