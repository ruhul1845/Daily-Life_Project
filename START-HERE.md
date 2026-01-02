# 🚀 START HERE - Daily Life Tracker

## Multi-User System with Login/Register

---

## ⚡ QUICK START (Copy & Paste These Commands)

### 1. Install Dependencies
```bash
cd /home/ruhul/Documents/Project
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Open Browser
```
http://localhost:3000
```

**That's it!** You're ready to use the app! 🎉

---

## 📝 FIRST TIME USAGE

### Step 1: Create Account
1. Browser will show **Register** page
2. Enter username (min 3 characters)
3. Enter password (min 6 characters) 
4. Confirm password
5. Click **"Create Account"**

### Step 2: Login
1. You'll be redirected to **Login** page
2. Enter your username and password
3. Click **"Sign In"**

### Step 3: Start Using!
- You're now on the **Home** page
- Click **"✍️ Write"** to add your first entry
- Fill the form and click submit
- Your data is saved!

---

## 👥 MULTIPLE USERS

Each user has their own:
- ✅ Separate account
- ✅ Private data
- ✅ Personal events, skills, studies
- ✅ Secure password

**To add more users:** Just click "Create one" on login page

---

## 🔑 KEY FEATURES

### 🔐 Authentication System
- Secure login/register
- Password hashing (bcrypt)
- Session-based auth
- Auto-logout on close

### 💾 Database Storage
- SQLite database (`dailylife.db`)
- Automatic creation
- Persistent storage
- Multi-user support

### 📊 Full Functionality
- Add events, skills, studies
- Search and filter
- Delete with confirmation
- Animated pie charts
- Real-time updates

---

## 📁 FILES CREATED

### Backend
- `server.js` - Node.js/Express server
- `package.json` - Dependencies
- `dailylife.db` - SQLite database (auto-created)

### Frontend
- `login.html` - Login page
- `register.html` - Registration page
- `app-api.js` - API client
- Updated all loaders to use API

### Documentation
- `SETUP.md` - Detailed setup guide
- `START-HERE.md` - This file (quick reference)

---

## 🌐 ACCESS FROM OTHER DEVICES

### Find Your IP Address:
**Linux:**
```bash
ip addr show
```

**Look for something like:** `192.168.1.100`

### Access from Phone/Tablet:
Open browser and go to: `http://YOUR_IP:3000`

Example: `http://192.168.1.100:3000`

---

## 🛑 STOP SERVER

Press `Ctrl + C` in terminal

---

## 📋 COMMON COMMANDS

```bash
# Start server
npm start

# Start in development mode (auto-restart)
npm run dev

# Check if running
ps aux | grep node

# View database
sqlite3 dailylife.db
.tables
.quit
```

---

## 🔧 TROUBLESHOOTING

### "Port 3000 already in use"
**Solution:** Change port in `server.js` or kill the process

### "Cannot find module"
**Solution:** Run `npm install`

### "Database locked"
**Solution:** Stop all server instances, restart

### Can't login
**Solution:** 
- Check username/password
- Clear browser cookies
- Create new account

---

## 🎯 WHAT TO DO NEXT

1. ✅ **Register** your account
2. ✅ **Login** to the system
3. ✅ **Add** your first event
4. ✅ **Add** a skill you're learning
5. ✅ **Log** a study session
6. ✅ **View** your data on Home/History/Skills pages
7. ✅ **Invite** friends/family to create their accounts

---

## 📊 SERVER INFO

- **URL:** http://localhost:3000
- **Port:** 3000 (change in server.js)
- **Database:** dailylife.db (SQLite)
- **Session:** 24 hours
- **Security:** bcrypt password hashing

---

## 📚 NEED MORE HELP?

- **Detailed Setup:** Read `SETUP.md`
- **Database Guide:** Read `README-DATABASE.md`  
- **Full Docs:** Read `README.md`
- **API Reference:** See `server.js` comments

---

## ✨ FEATURES AT A GLANCE

| Feature | Status |
|---------|--------|
| Multi-user | ✅ |
| Login/Register | ✅ |
| Add Events | ✅ |
| Add Skills | ✅ |
| Add Studies | ✅ |
| Search/Filter | ✅ |
| Delete Items | ✅ |
| Pie Charts | ✅ |
| Responsive | ✅ |
| Secure | ✅ |

---

## 🎉 YOU'RE ALL SET!

Your multi-user Daily Life Tracker is ready!

**Commands to remember:**
```bash
npm start              # Start server
Ctrl + C              # Stop server
http://localhost:3000  # Access in browser
```

**Happy Tracking!** 🚀

---

**Created by:** Your setup  
**Date:** January 2026  
**Version:** 3.0.0 (Multi-user)

