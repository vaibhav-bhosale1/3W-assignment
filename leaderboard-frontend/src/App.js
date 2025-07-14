
// leaderboard-frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserManagement from './component/UserManagement';
import ClaimPoints from './component/ClaimPoints';
import Leaderboard from './component/Leaderboard';
import ClaimHistory from './component/ClaimHistory';

const API_URL = 'https://threew-assignment-h03f.onrender.com/api';

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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        🏆 Leaderboard System
                    </h1>
                    <p className="text-lg text-gray-600">
                        Track and manage user points in real-time
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                            <p className="text-sm text-gray-600 mt-1">Add new users to the system</p>
                        </div>
                        <div className="p-6">
                            <UserManagement onUserAdded={handleUserAdded} />
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Claim Points</h2>
                            <p className="text-sm text-gray-600 mt-1">Award points to users</p>
                        </div>
                        <div className="p-6">
                            <ClaimPoints
                                users={users}
                                selectedUser={selectedUser}
                                setSelectedUser={setSelectedUser}
                                onPointsClaimed={handlePointsClaimed}
                            />
                        </div>
                    </section>
                </div>

                <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Dynamic Leaderboard</h2>
                        <p className="text-sm text-gray-600 mt-1">Live rankings updated every 5 seconds</p>
                    </div>
                    <div className="p-6">
                        {loading && (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <span className="ml-3 text-gray-600">Loading leaderboard...</span>
                            </div>
                        )}
                        {error && (
                            <div className="text-center py-8">
                                <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">{error}</p>
                            </div>
                        )}
                        {!loading && !error && <Leaderboard leaderboard={leaderboard} />}
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Claim History</h2>
                        <p className="text-sm text-gray-600 mt-1">Complete history of all point claims</p>
                    </div>
                    <div className="p-6">
                        {loading && (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <span className="ml-3 text-gray-600">Loading claim history...</span>
                            </div>
                        )}
                        {error && (
                            <div className="text-center py-8">
                                <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">{error}</p>
                            </div>
                        )}
                        {!loading && !error && <ClaimHistory claimHistory={claimHistory} />}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;