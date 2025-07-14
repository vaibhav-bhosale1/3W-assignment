// leaderboard-frontend/src/components/ClaimHistory.js
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function ClaimHistory({ claimHistory }) {
    return (
        <div className="claim-history-container mt-4">
            {claimHistory.length === 0 ? (
                <p className="text-center text-gray-500">No claim history available yet.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Points Claimed</TableHead>
                            <TableHead className="text-right">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {claimHistory.map((historyItem) => (
                            <TableRow key={historyItem._id}>
                                <TableCell>{historyItem.userId ? historyItem.userId.name : 'Unknown User'}</TableCell>
                                <TableCell className="text-right">{historyItem.pointsClaimed}</TableCell>
                                <TableCell className="text-right">{new Date(historyItem.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default ClaimHistory;