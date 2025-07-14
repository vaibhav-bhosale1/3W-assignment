// leaderboard-frontend/src/components/ClaimHistory.js
import React from 'react';

function ClaimHistory({ claimHistory }) {
    return (
        <div className="claim-history-container">
            <h3>Recent Claim History</h3>
            {claimHistory.length === 0 ? (
                <p>No claim history available yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Points Claimed</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claimHistory.map((historyItem) => (
                            <tr key={historyItem._id}>
                                <td>{historyItem.userId ? historyItem.userId.name : 'Unknown User'}</td>
                                <td>{historyItem.pointsClaimed}</td>
                                <td>{new Date(historyItem.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
             <style jsx>{`
                .claim-history-container {
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

export default ClaimHistory;