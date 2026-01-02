# 🚀 Daily Life Tracker - Setup Instructions

## Multi-User System with Authentication

---

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- A web browser (Chrome, Firefox, Safari, or Edge)

### Check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install Dependencies
Open terminal in the project folder and run:

```bash
npm install
```

This will install:
- `express` - Web server
- `express-session` - Session management
- `sqlite3` - Database
- `bcryptjs` - Password hashing

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
🚀 ================================
✨ Daily Life Tracker Server Running
🌐 Open: http://localhost:3000
🔐 Multi-user authentication enabled
💾 Database: SQLite (dailylife.db)
================================
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

You'll see the registration/login page!

---

## 👤 First Time Setup

### Create Your Account

1. Server will redirect you to registration page
2. Fill in the form:
   - **Username**: Choose a unique username (min 3 characters)
   - **Password**: Choose a secure password (min 6 characters)
   - **Confirm Password**: Re-enter your password
3. Click **"Create Account"**
4. You'll be redirected to login page

### Login

1. Enter your username and password
2. Click **"Sign In"**
3. You'll be redirected to the home page
4. Start adding your daily entries!

---

## 🔧 Detailed Setup

### 1. Project Structure
```
Project/
├── server.js              # Backend server
├── package.json           # Dependencies
├── dailylife.db          # SQLite database (auto-created)
├── login.html            # Login page
├── register.html         # Registration page
├── index.html            # Home page
├── write.html            # Write/Add entries page
├── history.html          # History timeline
├── skills.html           # Skills analysis
├── app-api.js            # API client
├── styles.css            # Styling
└── img/                  # Images folder
```

### 2. Database
The SQLite database `dailylife.db` will be created automatically on first run.

**Tables:**
- `users` - User accounts
- `events` - Daily events
- `skills` - Skills learned
- `studies` - Study sessions

### 3. Port Configuration
Default port is **3000**. To change:

Edit `server.js`:
```javascript
const PORT = 3000; // Change this
```

---

## 🎯 Using the Application

### Adding Data

1. Click **"✍️ Write"** in navigation
2. Fill out any form (Event, Skill, or Study)
3. Click submit button
4. Data is saved to your account!

### Viewing Data

- **🏠 Home**: Today's events, top skills, recent studies
- **📖 History**: Complete searchable timeline
- **🎯 Skills**: Skills analysis with pie chart

### Managing Users

Each user has their own:
- ✅ Personal events
- ✅ Personal skills  
- ✅ Personal study sessions
- ✅ Private data (not visible to other users)

---

## 🛠️ Development Mode

For auto-restart on file changes:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you edit files.

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Protected API endpoints
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ User data isolation

---

## 📊 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/check-auth` - Check authentication status

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Add new event
- `DELETE /api/events/:id` - Delete event

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add new skill
- `DELETE /api/skills/:id` - Delete skill

### Studies
- `GET /api/studies` - Get all studies
- `POST /api/studies` - Add new study
- `DELETE /api/studies/:id` - Delete study

### Statistics
- `GET /api/stats` - Get user statistics

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Error: Port 3000 is already in use
```
**Solution**: Change port in server.js or kill the process using port 3000

### Database Locked
```bash
# Error: Database is locked
```
**Solution**: Stop all instances of the server and restart

### Cannot Find Module
```bash
# Error: Cannot find module 'express'
```
**Solution**: Run `npm install` again

### Session Not Persisting
**Solution**: Clear browser cookies and try again

### Registration Error
- Check username is at least 3 characters
- Check password is at least 6 characters
- Check username isn't already taken

---

## 💾 Database Management

### View Database
```bash
# Install SQLite browser (optional)
# Or use command line:
sqlite3 dailylife.db
```

### Backup Database
```bash
cp dailylife.db dailylife_backup.db
```

### Reset Database
```bash
rm dailylife.db
# Restart server (database will be recreated)
```

---

## 🌐 Accessing from Other Devices

### Same Network
1. Find your computer's IP address
2. Other devices can access: `http://YOUR_IP:3000`

Example: `http://192.168.1.100:3000`

### Find Your IP:
- **Windows**: `ipconfig`
- **Mac/Linux**: `ifconfig` or `ip addr`

---

## 🚀 Deployment (Optional)

### Deploy to Heroku
1. Create Heroku account
2. Install Heroku CLI
3. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

### Deploy to Railway
1. Create Railway account
2. Connect GitHub repo
3. Auto-deploys on push

### Deploy to Render
1. Create Render account
2. Connect GitHub repo
3. Configure build settings

---

## 📝 Environment Variables (Optional)

Create `.env` file:
```env
PORT=3000
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
```

Update server.js to use:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

---

## 🎓 Learning Resources

- **Node.js**: https://nodejs.org/en/docs/
- **Express**: https://expressjs.com/
- **SQLite**: https://www.sqlite.org/docs.html
- **bcrypt**: https://www.npmjs.com/package/bcryptjs

---

## ✨ Features

- ✅ Multi-user support
- ✅ Secure authentication
- ✅ Password hashing
- ✅ Session management
- ✅ SQLite database
- ✅ RESTful API
- ✅ Real-time updates
- ✅ Search & filter
- ✅ Animated pie charts
- ✅ Responsive design

---

## 🆘 Need Help?

1. Check console for errors (F12)
2. Check server logs in terminal
3. Review SETUP.md (this file)
4. Check API endpoints with Postman
5. Clear browser cache and cookies

---

## 🎉 You're Ready!

Your multi-user Daily Life Tracker is ready to use!

**Next Steps:**
1. Create your account
2. Login
3. Start tracking your daily life!

**Server Commands:**
- Start: `npm start`
- Dev mode: `npm run dev`
- Stop: `Ctrl + C`

---

**Happy Tracking!** 🚀

