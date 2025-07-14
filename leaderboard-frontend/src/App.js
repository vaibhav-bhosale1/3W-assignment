// leaderboard-frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagement from './components/UserManagement';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import { cn } from './lib/utils'; // Import cn for conditional classes

const API_URL = 'http://localhost:5000/api';

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [claimHistory, setClaimHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [usersRes, leaderboardRes, historyRes] = await Promise.all([
                axios.get(`${API_URL}/users`),
                axios.get(`${API_URL}/leaderboard`),
                axios.get(`${API_URL}/history`)
            ]);
            setUsers(usersRes.data);
            setLeaderboard(leaderboardRes.data);
            setClaimHistory(historyRes.data);
            if (usersRes.data.length > 0 && !selectedUser) {
                setSelectedUser(usersRes.data[0]._id);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUserAdded = () => {
        fetchData();
    };

    const handlePointsClaimed = () => {
        fetchData();
    };

    return (
        <div className="container p-8 bg-white rounded-lg shadow-md max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <h1 className="col-span-full text-center text-4xl font-bold text-blue-700 mb-6">
                🏆 Leaderboard System 🏆
            </h1>

            <section className="col-span-1 p-6 border rounded-md">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">User Management</h2>
                <UserManagement onUserAdded={handleUserAdded} />
            </section>

            <section className="col-span-1 p-6 border rounded-md">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Claim Points</h2>
                <ClaimPoints
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    onPointsClaimed={handlePointsClaimed}
                />
            </section>

            <section className="col-span-full p-6 border rounded-md">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Dynamic Leaderboard</h2>
                {loading && <p className="text-center text-gray-500">Loading leaderboard...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && <Leaderboard leaderboard={leaderboard} />}
            </section>

            <section className="col-span-full p-6 border rounded-md">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Claim History</h2>
                {loading && <p className="text-center text-gray-500">Loading claim history...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && <ClaimHistory claimHistory={claimHistory} />}
            </section>
        </div>
    );
}

export default App;