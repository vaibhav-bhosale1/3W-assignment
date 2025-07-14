// leaderboard-frontend/src/components/Leaderboard.js
import React from 'react';

function Leaderboard({ leaderboard }) {
    return (
        <div className="leaderboard-container">
            <h3>Current Rankings</h3>
            {leaderboard.length === 0 ? (
                <p>No users on the leaderboard yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.totalPoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
             <style jsx>{`
                .leaderboard-container {
                    margin-top: 20px;
                    width: 100%;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
}

export default Leaderboard;