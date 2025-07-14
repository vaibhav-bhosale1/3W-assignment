// leaderboard-backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const defaultUsers = [
    { name: 'Rahul' },
    { name: 'Kamal' },
    { name: 'Sanak' },
    { name: 'Priya' },
    { name: 'Amit' },
    { name: 'Deepa' },
    { name: 'Vikas' },
    { name: 'Sneha' },
    { name: 'Arjun' },
    { name: 'Nisha' }
];

const seedUsers = async () => {
    await connectDB(); // Connect to the database

    try {
        // Clear existing users to prevent duplicates on re-seeding
        await User.deleteMany({});
        console.log('Existing users cleared.');

        // Insert default users
        await User.insertMany(defaultUsers);
        console.log('Default users seeded successfully.');
        process.exit(0); // Exit with success
    } catch (err) {
        console.error('Error seeding users:', err.message);
        process.exit(1); // Exit with failure
    }
};

seedUsers();