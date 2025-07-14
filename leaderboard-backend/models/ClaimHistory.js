// leaderboard-backend/models/ClaimHistory.js
const mongoose = require('mongoose');

const ClaimHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    },
    pointsClaimed: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ClaimHistory', ClaimHistorySchema);