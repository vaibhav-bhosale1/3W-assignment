// leaderboard-frontend/src/components/UserManagement.js
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Terminal, UserPlus, CheckCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL;

function UserManagement({ onUserAdded }) {
    const [newUserName, setNewUserName] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddUser = async () => {
        if (!newUserName.trim()) {
            setMessage('User name cannot be empty!');
            setIsError(true);
            return;
        }
        
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddUser();
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="new-user-name" className="text-sm font-medium text-gray-700">
                    New User Name
                </Label>
                <Input
                    type="text"
                    id="new-user-name"
                    placeholder="Enter user name"
                    value={newUserName}
                    onChange={(e) => {
                        setNewUserName(e.target.value);
                        setMessage('');
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full"
                />
            </div>

            <Button 
                onClick={handleAddUser} 
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding User...
                    </>
                ) : (
                    <>
                        Add User
                        <UserPlus className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>

            {message && (
                <Alert variant={isError ? "destructive" : "default"} className="border-l-4">
                    {isError ? (
                        <Terminal className="h-4 w-4" />
                    ) : (
                        <CheckCircle className="h-4 w-4" />
                    )}
                    <AlertTitle className="font-semibold">
                        {isError ? "Error!" : "Success!"}
                    </AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}

export default UserManagement;