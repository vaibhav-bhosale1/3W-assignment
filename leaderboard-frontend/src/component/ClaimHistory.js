// leaderboard-frontend/src/components/ClaimHistory.js
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";

function ClaimHistory({ claimHistory }) {
    return (
        <div className="claim-history-container">
            {claimHistory.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <p className="text-gray-500 text-lg">No claim history available yet.</p>
                    <p className="text-gray-400 text-sm mt-2">Claims will appear here once users start earning points</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold text-gray-900">User</TableHead>
                                <TableHead className="font-semibold text-gray-900 text-right">Points Claimed</TableHead>
                                <TableHead className="font-semibold text-gray-900 text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {claimHistory.map((historyItem, index) => (
                                <TableRow key={historyItem._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <TableCell className="font-medium text-gray-900">
                                        {historyItem.userId ? historyItem.userId.name : 'Unknown User'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            +{historyItem.pointsClaimed}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-600 text-sm">
                                        {new Date(historyItem.timestamp).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default ClaimHistory;