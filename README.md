# FEASTY 🍔🎬

A high-performance MERN stack application delivering a **TikTok-like short video reel experience** for food content. Built with focus on media optimization, role-based access control, and seamless user experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Recent Updates](#recent-updates)
- [Development](#development)

---

## 🎯 Overview

Feasty is a learning project that explores:
- **High-performance media delivery** with real-time video transformations
- **Role-based authentication** (Users & Food Partners) via Google OAuth
- **Optimized video streaming** with preloading and caching strategies
- **Modern UI/UX** with glassmorphism design patterns

### Key Metrics
- **Video Compression:** 480p @ 500k bitrate for mobile optimization
- **Preload Strategy:** Current + previous + next two videos (4 total)
- **Cache Model:** Sticky caching for instant re-watches
- **UI Framework:** Tailwind CSS with intersection observers for performance

---

## ✨ Key Features

### 🔐 Authentication
- **Google OAuth Integration** via Firebase Auth
- Single unified login entry point (`UnifiedLogin.jsx`)
- Role selector for Users vs Food Partners
- Automatic routing: new users → register, existing users → dashboard
- Secure JWT cookie issuance (`httpOnly`, `SameSite=None`, 7-day expiry)

### 📹 Video Reels
- **Intelligent Preloading** - Next 4 videos cached automatically
- **Intersection Observer** - Auto-play when reel enters viewport (60% threshold)
- **Sticky Playback** - Once loaded, reels stay cached even when scrolling away
- **Auto-Advance** - Seamless scroll to next reel on completion
- **Manual Controls** - Click to play/pause individual videos

### 👥 Role-Based Experience
**Food Partners:**
- Upload & manage food reels
- View profile with photo, address, bio
- Delete individual videos with confirmation
- Delete entire account with cascading cleanup

**Users (Food Lovers):**
- Discover food reels in optimized feed
- Like reels (persisted to database)
- Save reels to personal collection
- View saved reels in separate feed
- Manage profile & photo

### 🎨 UI/UX
- **Glassmorphism Design** - Blurred backgrounds with transparency
- **Modal Components** - AuthCard wrapper for consistent form styling
- **Responsive Layout** - Mobile-first, adapts to all screen sizes
- **Visual Feedback** - Loading states, buffering indicators, smooth transitions
- **Persistent Navigation** - Bottom navbar with fixed positioning

### 🗑️ Data Management
- **Delete Flows** - Videos and accounts with confirmation modals
- **Photo Persistence** - localStorage caching for profile photos
- **Session Management** - Utility functions for clearing user/partner data
- **Cascading Deletes** - Account deletion removes all associated content

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React.js** | UI library with functional components & hooks |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling framework |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |
| **Axios** | HTTP client with credentials |
| **Firebase SDK** | Google OAuth & ID token management |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web server framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Token-based authentication |
| **Firebase Admin SDK** | ID token verification |
| **bcryptjs** | Password hashing (legacy login) |
| **ImageKit** | Media CDN & transformations |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **ImageKit.io** | Real-time video compression & CDN delivery |
| **MongoDB Atlas** | Cloud database hosting |
| **Firebase Project** | Google OAuth & authentication |

---

## 📂 Project Structure

```
feasty/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Shared navigation bar
│   │   │   ├── GoogleSignInButton.jsx  # Google auth button
│   │   │   ├── ConfirmModal.jsx        # Reusable confirmation dialog
│   │   │   ├── AuthCard.jsx            # Form wrapper component
│   │   │   ├── PrimaryButton.jsx       # Standardized CTA button
│   │   │   └── [other components]
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── UnifiedLogin.jsx         # Main auth entry (Google only)
│   │   │   │   ├── UserRegister.jsx        # User account creation
│   │   │   │   └── FoodPartnerRegister.jsx # Partner account creation
│   │   │   │
│   │   │   ├── general/
│   │   │   │   ├── Home.jsx            # Landing page (carousel)
│   │   │   │   ├── Welcome.jsx         # User dashboard
│   │   │   │   ├── WelcomePartner.jsx  # Partner dashboard
│   │   │   │   └── UserProfile.jsx     # User profile page
│   │   │   │
│   │   │   ├── food-partner/
│   │   │   │   ├── CreateFood.jsx      # Upload video reel
│   │   │   │   └── Profile.jsx         # Partner profile + video grid
│   │   │   │
│   │   │   └── components/
│   │   │       ├── VideoReels.jsx      # Main feed with preloading
│   │   │       └── SavedReels.jsx      # User's saved videos
│   │   │
│   │   ├── utils/
│   │   │   ├── axios.js                # Configured Axios instance
│   │   │   └── localStorage.js         # Session utilities
│   │   │
│   │   ├── config/
│   │   │   └── firebase.js             # Firebase initialization
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx           # All route definitions
│   │   │
│   │   ├── App.jsx                     # Root component
│   │   ├── main.jsx                    # Entry point
│   │   ├── index.css                   # Global styles
│   │   └── App.css                     # App-specific styles
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Auth logic (register, login, verify)
│   │   │   ├── food.controller.js      # CRUD, likes, saves
│   │   │   └── food-partner.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js          # Auth endpoints
│   │   │   ├── food.routes.js          # Food CRUD endpoints
│   │   │   └── food-partner.routes.js  # Partner endpoints
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js      # JWT & Firebase verification
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── foodpartner.model.js
│   │   │   ├── food.model.js
│   │   │   ├── like.model.js
│   │   │   └── save.model.js
│   │   │
│   │   ├── services/
│   │   │   └── storage.service.js      # ImageKit integration
│   │   │
│   │   ├── config/
│   │   │   └── firebase.js             # Firebase Admin SDK
│   │   │
│   │   ├── db/
│   │   │   └── db.js                   # MongoDB connection
│   │   │
│   │   └── app.js                      # Express configuration
│   │
│   ├── server.js                       # Entry point
│   ├── package.json
│   └── .env                            # Environment variables
│
├── docs/
│   └── screenshots/
│
└── README.md                           # This file
```

---

## 🏗️ Architecture

### Authentication Flow

```
User visits /login
       ↓
UnifiedLogin.jsx (select role: User or Partner)
       ↓
GoogleSignInButton → Firebase signInWithPopup()
       ↓
Backend: POST /api/auth/verify-google-token
       ↓
Is user new?
  ├─ YES → Route to /user/register or /partner/register
  └─ NO  → Issue JWT cookie, route to dashboard
```

### Video Feed Architecture

```
VideoReels Component
├── Fetch: GET /api/food/ (all videos)
├── Fetch: GET /api/food/user/interactions (likes + saves)
├── Normalize: Attach interaction flags to each video
│
└── Render: Reel List
    ├── Preload logic (current ±2)
    ├── Intersection Observer (auto-play at 60%)
    ├── Sticky caching (stays loaded when scrolling)
    ├── Manual play/pause
    └── Auto-advance on completion
```

### Request/Response Pattern

**Frontend:**
- Axios instance with `withCredentials: true` (cross-site cookies)
- All requests include JWT cookie automatically

**Backend:**
- Middleware verifies JWT cookie on protected routes
- Populates `req.user` or `req.foodPartner` from token
- Returns 401 if token invalid/missing

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Firebase project with Google OAuth enabled
- ImageKit account (for video storage)

### Installation

**1. Clone & Install Dependencies**
```bash
git clone <repo-url>
cd feasty

# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

**2. Environment Setup**

**Backend** (`backend/.env`):
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
IMAGEKIT_PUBLICKEY=your_pk
IMAGEKIT_PRIVATEKEY=your_prk
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

**Frontend** (`frontend/.env.local`):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

**3. Start Development Servers**
```bash
# Terminal 1 - Backend (http://localhost:5000)
cd backend && npm start

# Terminal 2 - Frontend (http://localhost:5173)
cd frontend && npm run dev
```

---

## 📊 Recent Updates (Prod Cleanup Branch)

### Code Quality Improvements
- ✅ **Removed Dead Code:** UserLogin.jsx, FoodPartnerLogin.jsx, ChooseRegister.jsx
- ✅ **Component Extraction:** AuthCard, PrimaryButton (~260 chars markup reduction)
- ✅ **Utility Consolidation:** localStorage.js shared across 4+ files
- ✅ **State Cleanup:** Removed unused variables (isGoogleSignup, handleNewUser)
- ✅ **Debug Log Removal:** Cleaned console logs from controllers
- ✅ **Consistency Improvements:** Unified button styling, error handling patterns

### Bug Fixes
- ✅ Fixed variable scope issue in WelcomePartner.jsx
- ✅ Corrected `.then(console.log)` pattern in db.js
- ✅ Updated string concatenation to template literals

### New Components
| Component | Purpose | Usage |
|-----------|---------|-------|
| AuthCard | Form wrapper | UserRegister, FoodPartnerRegister, UserProfile |
| PrimaryButton | CTA button | Register & auth forms |
| GoogleSignInButton | OAuth button | UnifiedLogin |

---

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

**Backend:**
```bash
npm start          # Start server
npm run dev        # Dev mode with nodemon
```

### Key API Endpoints

**Auth:**
- `POST /api/auth/user/register` - Traditional user signup
- `POST /api/auth/user/login` - Traditional user login
- `POST /api/auth/user/register-google` - Google signup (new users)
- `POST /api/auth/verify-google-token` - Firebase token verification
- `DELETE /api/auth/user/:id` - Delete user account

**Food:**
- `GET /api/food/` - All food items
- `POST /api/food/` - Create reel (partners only)
- `DELETE /api/food/:id` - Delete reel (partners only)
- `POST /api/food/like` - Like reel
- `POST /api/food/save` - Save reel
- `GET /api/food/user/interactions` - Get user's likes & saves
- `GET /api/food/saved-reels/:id` - Get user's saved reels

**Partners:**
- `GET /api/foodpartner/:id` - Partner profile
- `POST /api/foodpartner/register` - Traditional partner signup
- `POST /api/foodpartner/register-google` - Google signup (new partners)

---

## 📝 Notes

- **Frontend Only:** Google OAuth enabled in UI. Backend retains traditional login endpoints (not used in current flow).
- **Staging:** All changes on `prod-cleanup` branch, ready for merge to `main`.
- **Production:** Requires `NODE_ENV=production` for secure cookies.
- **Media Handling:** All videos processed through ImageKit for compression + CDN delivery.

---

## 📸 Screenshots

[Screenshots directory: `docs/screenshots/`]
![Home](./docs/screenshots/Home.png)
![Reels](./docs/screenshots/Reels.png)
![Saved](./docs/screenshots/Saved.png)
---

