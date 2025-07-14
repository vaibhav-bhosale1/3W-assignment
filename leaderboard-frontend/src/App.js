// leaderboard-frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagement from './components/UserManagement';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory'; // Optional component

const API_URL = 'http://localhost:5000/api'; // Backend API URL

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [claimHistory, setClaimHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch users and leaderboard on component mount
    useEffect(() => {
        fetchData();
        // Set up an interval for real-time updates (e.g., every 5 seconds)
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId); // Clear interval on unmount
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
                setSelectedUser(usersRes.data[0]._id); // Select first user by default
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUserAdded = () => {
        fetchData(); // Refetch all data after a new user is added
    };

    const handlePointsClaimed = () => {
        fetchData(); // Refetch all data after points are claimed
    };

    return (
        <div className="container">
            <h1>🏆 Leaderboard System 🏆</h1>

            <section>
                <h2 className="section-title">User Management</h2>
                <UserManagement onUserAdded={handleUserAdded} />
            </section>

            <section>
                <h2 className="section-title">Claim Points</h2>
                <ClaimPoints
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    onPointsClaimed={handlePointsClaimed}
                />
            </section>

            <section style={{ gridColumn: '1 / -1' }}> {/* Make leaderboard span full width */}
                <h2 className="section-title">Dynamic Leaderboard</h2>
                {loading && <p>Loading leaderboard...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && <Leaderboard leaderboard={leaderboard} />}
            </section>

            <section style={{ gridColumn: '1 / -1' }}> {/* Make history span full width */}
                <h2 className="section-title">Claim History</h2>
                {loading && <p>Loading claim history...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && <ClaimHistory claimHistory={claimHistory} />}
            </section>
        </div>
    );
}

export default App;