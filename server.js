// Daily Life Tracker - Backend Server
// Node.js + Express + SQLite

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Database setup
const db = new sqlite3.Database('./dailylife.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('✅ Database connected');
        initDatabase();
    }
});

// Initialize database tables
function initDatabase() {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Events table
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Skills table
    db.run(`CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        level TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Studies table
    db.run(`CREATE TABLE IF NOT EXISTS studies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        subject TEXT NOT NULL,
        duration REAL NOT NULL,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    console.log('✅ Database tables initialized');
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Session middleware
app.use(session({
    secret: 'daily-life-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true
    }
}));

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized. Please login.' });
    }
}

// ============ AUTHENTICATION ROUTES ============

// Register new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        // Check if username exists
        db.get('SELECT id FROM users WHERE username = ?', [username], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (row) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', 
                [username, hashedPassword], 
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Error creating user' });
                    }

                    res.json({ 
                        success: true, 
                        message: 'Registration successful!',
                        userId: this.lastID 
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Create session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({ 
            success: true, 
            message: 'Login successful!',
            user: {
                id: user.id,
                username: user.username
            }
        });
    });
});

// Logout user
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Check auth status
app.get('/api/check-auth', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            authenticated: true, 
            user: {
                id: req.session.userId,
                username: req.session.username
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

// ============ EVENTS ROUTES ============

// Get all events for user
app.get('/api/events', requireAuth, (req, res) => {
    db.all('SELECT * FROM events WHERE user_id = ? ORDER BY date DESC, time DESC', 
        [req.session.userId], 
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Add new event
app.post('/api/events', requireAuth, (req, res) => {
    const { date, time, title, description } = req.body;

    if (!date || !time || !title) {
        return res.status(400).json({ error: 'Date, time, and title are required' });
    }

    db.run('INSERT INTO events (user_id, date, time, title, description) VALUES (?, ?, ?, ?, ?)',
        [req.session.userId, date, time, title, description],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error adding event' });
            }
            res.json({ 
                success: true, 
                id: this.lastID,
                message: 'Event added successfully'
            });
        }
    );
});

// Delete event
app.delete('/api/events/:id', requireAuth, (req, res) => {
    db.run('DELETE FROM events WHERE id = ? AND user_id = ?',
        [req.params.id, req.session.userId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error deleting event' });
            }
            res.json({ success: true, message: 'Event deleted' });
        }
    );
});

// ============ SKILLS ROUTES ============

// Get all skills for user
app.get('/api/skills', requireAuth, (req, res) => {
    db.all('SELECT * FROM skills WHERE user_id = ? ORDER BY date DESC', 
        [req.session.userId], 
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Add new skill
app.post('/api/skills', requireAuth, (req, res) => {
    const { date, name, category, level, description } = req.body;

    if (!date || !name || !category || !level) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run('INSERT INTO skills (user_id, date, name, category, level, description) VALUES (?, ?, ?, ?, ?, ?)',
        [req.session.userId, date, name, category, level, description],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error adding skill' });
            }
            res.json({ 
                success: true, 
                id: this.lastID,
                message: 'Skill added successfully'
            });
        }
    );
});

// Delete skill
app.delete('/api/skills/:id', requireAuth, (req, res) => {
    db.run('DELETE FROM skills WHERE id = ? AND user_id = ?',
        [req.params.id, req.session.userId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error deleting skill' });
            }
            res.json({ success: true, message: 'Skill deleted' });
        }
    );
});

// ============ STUDIES ROUTES ============

// Get all studies for user
app.get('/api/studies', requireAuth, (req, res) => {
    db.all('SELECT * FROM studies WHERE user_id = ? ORDER BY date DESC', 
        [req.session.userId], 
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

// Add new study
app.post('/api/studies', requireAuth, (req, res) => {
    const { date, subject, duration, notes } = req.body;

    if (!date || !subject || !duration) {
        return res.status(400).json({ error: 'Date, subject, and duration are required' });
    }

    db.run('INSERT INTO studies (user_id, date, subject, duration, notes) VALUES (?, ?, ?, ?, ?)',
        [req.session.userId, date, subject, duration, notes],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error adding study' });
            }
            res.json({ 
                success: true, 
                id: this.lastID,
                message: 'Study session logged successfully'
            });
        }
    );
});

// Delete study
app.delete('/api/studies/:id', requireAuth, (req, res) => {
    db.run('DELETE FROM studies WHERE id = ? AND user_id = ?',
        [req.params.id, req.session.userId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error deleting study' });
            }
            res.json({ success: true, message: 'Study deleted' });
        }
    );
});

// ============ STATISTICS ROUTES ============

app.get('/api/stats', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const stats = {};

    // Get total skills
    db.get('SELECT COUNT(*) as total FROM skills WHERE user_id = ?', [userId], (err, row) => {
        stats.totalSkills = row ? row.total : 0;

        // Get week skills
        db.get('SELECT COUNT(*) as total FROM skills WHERE user_id = ? AND date >= date("now", "-7 days")', 
            [userId], (err, row) => {
            stats.weekSkills = row ? row.total : 0;

            // Get month skills
            db.get('SELECT COUNT(*) as total FROM skills WHERE user_id = ? AND date >= date("now", "-30 days")', 
                [userId], (err, row) => {
                stats.monthSkills = row ? row.total : 0;

                res.json(stats);
            });
        });
    });
});

// Root route
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.sendFile(path.join(__dirname, 'login.html'));
    }
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 ================================');
    console.log(`✨ Daily Life Tracker Server Running`);
    console.log(`🌐 Open: http://localhost:${PORT}`);
    console.log('🔐 Multi-user authentication enabled');
    console.log('💾 Database: SQLite (dailylife.db)');
    console.log('================================');
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('\n👋 Server stopped. Database closed.');
        process.exit(0);
    });
});

