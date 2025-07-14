// leaderboard-frontend/src/components/ClaimPoints.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Terminal } from 'lucide-react'; // Example icons

const API_URL = 'http://localhost:5000/api';

function ClaimPoints({ users, selectedUser, setSelectedUser, onPointsClaimed }) {
    const [claimedPoints, setClaimedPoints] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleClaimPoints = async () => {
        if (!selectedUser) {
            setMessage('Please select a user first.');
            setIsError(true);
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/claim`, { userId: selectedUser });
            setClaimedPoints(res.data.pointsClaimed);
            setMessage(`🎉 ${res.data.user.name} claimed ${res.data.pointsClaimed} points!`);
            setIsError(false);
            onPointsClaimed();
        } catch (err) {
            console.error('Error claiming points:', err);
            setMessage(err.response?.data?.msg || 'Failed to claim points.');
            setIsError(true);
            setClaimedPoints(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="user-select">Select User</Label>
                <Select
                    value={selectedUser}
                    onValueChange={(value) => {
                        setSelectedUser(value);
                        setMessage('');
                        setClaimedPoints(null);
                    }}
                >
                    <SelectTrigger id="user-select">
                        <SelectValue placeholder="Select a User" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user._id} value={user._id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleClaimPoints} disabled={!selectedUser} className="w-full">
                Claim Points <Sparkles className="ml-2 h-4 w-4" />
            </Button>
            {message && (
                <Alert variant={isError ? "destructive" : "default"}>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{isError ? "Error!" : "Success!"}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}
            {claimedPoints !== null && !isError && (
                <Alert className="mt-4">
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>Points Claimed!</AlertTitle>
                    <AlertDescription>You just claimed {claimedPoints} points!</AlertDescription>
                </Alert>
            )}
        </div>
    );
}

export default ClaimPoints;