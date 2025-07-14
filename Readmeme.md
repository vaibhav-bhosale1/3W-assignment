# Leaderboard System with Dynamic Rankings

This is a full-stack application that implements a dynamic leaderboard system. Users can be added, claim random points, and their rankings are updated in real-time on a leaderboard. The system also maintains a history of all point claims.

## 🎯 Features

  * **User Management**: Display a list of 10 default users, and allow adding new users from the frontend.
  * **Claim Points**: A "Claim" button assigns random points (1 to 10) to a selected user, updates their total points, and records the claim history.
  * **Dynamic Leaderboard**: Shows user names, total points, and current rank, updating dynamically after each claim.
  * **Claim History**: View a detailed history of all point claims.
  * **Modern UI**: Implemented with Shadcn UI for a clean and modern user experience.

-----

## 🧩 Tech Stack

  * **Frontend**: ReactJS
  * **Backend**: Node.js (Express)
  * **Database**: MongoDB (using Mongoose ODM)
  * **Communication**: REST API
  * **UI Library**: Shadcn UI (with Tailwind CSS)

-----

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

  * Node.js (LTS version recommended)
  * MongoDB (Community Server or MongoDB Atlas)

### 1\. Backend Setup

Navigate to the `leaderboard-backend` directory.

```bash
cd leaderboard-backend
```

**Install Dependencies:**

```bash
npm install
```

**Environment Variables:**

Create a `.env` file in the `leaderboard-backend` directory and add your MongoDB connection string.

```
MONGO_URI=mongodb://localhost:27017/leaderboardDB
PORT=5000
```

**Seed Default Users:**

To populate your database with 10 default users, run the seed script:

```bash
npm run seed
```

**Start the Backend Server:**

```bash
npm start
```

The backend server will run on `http://localhost:5000`. You should see "MongoDB Connected..." and "Server running on port 5000" in your console.

-----

### 2\. Frontend Setup

Open a new terminal, navigate to the `leaderboard-frontend` directory.

```bash
cd leaderboard-frontend
```

**Install Dependencies:**

```bash
npm install
```

**Start the Frontend Development Server:**

```bash
npm start
```

The React development server will start and open the application in your browser, typically at `http://localhost:3000`.

-----

## 🧪 Testing the Application

Once both the backend and frontend servers are running:

1.  **View Initial State**: The application will load with 10 default users in the "Claim Points" dropdown and on the "Dynamic Leaderboard".
2.  **Add New User**:
      * In the "User Management" section, enter a name (e.g., "New Challenger") and click "Add User".
      * The new user will appear in the user selection dropdown and eventually on the leaderboard (with 0 points).
3.  **Claim Points**:
      * Select any user from the dropdown in the "Claim Points" section.
      * Click the "Claim Points" button.
      * Observe the awarded points. The user's total points on the leaderboard will update, and their rank may change.
      * A new entry will appear in the "Claim History" section.
4.  **Dynamic Updates**: Continue claiming points for different users to see the leaderboard dynamically re-rank based on total points.

-----

## 📂 Project Structure

```
leaderboard-system/
├── leaderboard-backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   └── userController.js   # API logic for users, claims, leaderboard, history
│   ├── models/
│   │   ├── User.js             # Mongoose User model
│   │   └── ClaimHistory.js     # Mongoose ClaimHistory model
│   ├── routes/
│   │   └── api.js              # API routes definition
│   ├── .env                    # Environment variables
│   ├── package.json
│   ├── server.js               # Main backend application file
│   └── seed.js                 # Script to seed initial user data
└── leaderboard-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ui/             # Shadcn UI components
    │   │   ├── ClaimHistory.js
    │   │   ├── ClaimPoints.js
    │   │   ├── Leaderboard.js
    │   │   └── UserManagement.js
    │   ├── lib/
    │   │   └── utils.js        # Shadcn UI utility functions
    │   ├── App.js              # Main application component
    │   ├── index.css           # Tailwind CSS and global styles
    │   └── index.js            # React entry point
    ├── package.json
    ├── tailwind.config.js      # Tailwind CSS configuration
    └── postcss.config.js
```