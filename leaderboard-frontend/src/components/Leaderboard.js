// leaderboard-frontend/src/components/Leaderboard.js
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function Leaderboard({ leaderboard }) {
    return (
        <div className="leaderboard-container mt-4">
            {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500">No users on the leaderboard yet.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Total Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboard.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell className="text-right">{user.totalPoints}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default Leaderboard;