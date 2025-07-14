// leaderboard-frontend/src/components/ClaimPoints.js
import React, { useState } from 'react';
import axios from 'axios';

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
            onPointsClaimed(); // Notify parent to refresh data
        } catch (err) {
            console.error('Error claiming points:', err);
            setMessage(err.response?.data?.msg || 'Failed to claim points.');
            setIsError(true);
            setClaimedPoints(null);
        }
    };

    return (
        <div>
            <h3>Claim Points</h3>
            <select
                value={selectedUser}
                onChange={(e) => {
                    setSelectedUser(e.target.value);
                    setMessage(''); // Clear message on selection change
                    setClaimedPoints(null);
                }}
            >
                <option value="">Select a User</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button onClick={handleClaimPoints} disabled={!selectedUser}>
                Claim Points
            </button>
            {message && (
                <p className={isError ? 'error-message' : 'success-message'}>
                    {message}
                </p>
            )}
            {claimedPoints !== null && !isError && (
                <p className="success-message">You just claimed {claimedPoints} points!</p>
            )}
        </div>
    );
}

export default ClaimPoints;