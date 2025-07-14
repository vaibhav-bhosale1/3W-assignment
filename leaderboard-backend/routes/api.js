// leaderboard-backend/routes/api.js
const express = require('express');
const router = express.Router();
const {
    getUsers,
    addUser,
    claimPoints,
    getLeaderboard,
    getClaimHistory
} = require('../controllers/userController');

// User routes
router.get('/users', getUsers);
router.post('/users', addUser);

// Claim points route
router.post('/claim', claimPoints);

// Leaderboard route
router.get('/leaderboard', getLeaderboard);

// Claim history route
router.get('/history', getClaimHistory);

module.exports = router;