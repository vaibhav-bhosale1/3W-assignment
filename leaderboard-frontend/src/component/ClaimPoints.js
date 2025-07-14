// leaderboard-frontend/src/components/ClaimPoints.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Sparkles, Terminal, CheckCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL;;

function ClaimPoints({ users, selectedUser, setSelectedUser, onPointsClaimed }) {
    const [claimedPoints, setClaimedPoints] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClaimPoints = async () => {
        if (!selectedUser) {
            setMessage('Please select a user first.');
            setIsError(true);
            return;
        }
        
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="user-select" className="text-sm font-medium text-gray-700">
                    Select User
                </Label>
                <select
                    value={selectedUser}
                    onChange={(e) => {
                        setSelectedUser(e.target.value);
                        setMessage('');
                        setClaimedPoints(null);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                    <option value="">Choose a user to award points</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <Button 
                onClick={handleClaimPoints} 
                disabled={!selectedUser || isLoading} 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Claiming Points...
                    </>
                ) : (
                    <>
                        Claim Points
                        <Sparkles className="ml-2 h-4 w-4" />
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

            {claimedPoints !== null && !isError && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <Sparkles className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                            <h3 className="font-semibold text-green-900">Points Claimed!</h3>
                            <p className="text-green-700 text-sm">
                                Successfully awarded {claimedPoints} points!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClaimPoints;
