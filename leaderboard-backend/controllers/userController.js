// leaderboard-backend/controllers/userController.js
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// @route   GET /api/users
// @desc    Get all users
// @access  Public
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: 1 }); // Sort by creation date
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/users
// @desc    Add a new user
// @access  Public
exports.addUser = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: 'Please enter a user name' });
    }

    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({ msg: 'User with this name already exists' });
        }

        user = new User({
            name,
            totalPoints: 0 // New user starts with 0 points
        });

        await user.save();
        res.status(201).json(user); // 201 Created
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/claim
// @desc    Claim random points for a user
// @access  Public
exports.claimPoints = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
    }

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const pointsClaimed = Math.floor(Math.random() * 10) + 1; // Random points between 1 and 10
        user.totalPoints += pointsClaimed;

        await user.save();

        // Create a claim history record
        const claimHistory = new ClaimHistory({
            userId,
            pointsClaimed
        });
        await claimHistory.save();

        res.json({ user, pointsClaimed }); // Return updated user and points claimed
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/leaderboard
// @desc    Get leaderboard (users sorted by points)
// @access  Public
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ totalPoints: -1, createdAt: 1 }); // Sort by totalPoints descending, then createdAt ascending for ties
        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/history
// @desc    Get all point claim history
// @access  Public
exports.getClaimHistory = async (req, res) => {
    try {
        // Populate userId to get user details in history
        const history = await ClaimHistory.find().populate('userId', 'name').sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};