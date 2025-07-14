// leaderboard-frontend/src/components/Leaderboard.js
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";

function Leaderboard({ leaderboard }) {
    const getRankDisplay = (rank) => {
        const badges = {
            1: { emoji: '🥇', bg: 'bg-yellow-100', text: 'text-yellow-800' },
            2: { emoji: '🥈', bg: 'bg-gray-100', text: 'text-gray-800' },
            3: { emoji: '🥉', bg: 'bg-orange-100', text: 'text-orange-800' }
        };
        
        const badge = badges[rank];
        if (badge) {
            return (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
                    {badge.emoji} #{rank}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                #{rank}
            </span>
        );
    };

    return (
        <div className="leaderboard-container">
            {leaderboard.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🏆</div>
                    <p className="text-gray-500 text-lg">No users on the leaderboard yet.</p>
                    <p className="text-gray-400 text-sm mt-2">Add users and claim points to see rankings</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold text-gray-900">Rank</TableHead>
                                <TableHead className="font-semibold text-gray-900">Name</TableHead>
                                <TableHead className="font-semibold text-gray-900 text-right">Total Points</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.map((user, index) => (
                                <TableRow key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <TableCell className="font-medium">
                                        {getRankDisplay(index + 1)}
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">
                                        {user.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-2xl font-bold text-gray-900">
                                            {user.totalPoints}
                                        </span>
                                        <span className="text-gray-500 text-sm ml-1">pts</span>
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

export default Leaderboard;