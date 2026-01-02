# 💾 Daily Life Tracker - Database System

## 🎉 What's New?

Your Daily Life website now has **persistent data storage**! No more manual HTML editing - everything is saved automatically using browser localStorage.

## ✨ Key Features

### 📝 Automatic Saving
- Write forms automatically save data when you submit
- Data persists even after closing the browser
- All pages load data dynamically

### 🔄 Real-Time Updates
- Add events, skills, and study sessions instantly
- Delete items with confirmation
- Search and filter across all data
- Statistics update automatically

### 💾 Data Storage
- Uses browser localStorage (5-10MB storage)
- Data stored locally on your computer
- No internet connection required
- Export/Import functionality for backups

## 📁 New Files

### JavaScript Files:
1. **app.js** - Core database management system
2. **index-loader.js** - Loads data on home page
3. **write-handler.js** - Handles form submissions
4. **history-loader.js** - Loads and filters history
5. **skills-loader.js** - Loads skills and pie chart

## 🚀 How to Use

### Adding Data (Write Page)

1. Go to the **Write** page
2. Fill out any form:
   - **Daily Event**: Date, time, title, description
   - **New Skill**: Date, name, category, level, description
   - **Study Session**: Date, subject, duration, notes
3. Click submit button
4. See success notification!
5. Data is automatically saved

### Viewing Data

- **Home Page**: Shows today's events, top skills, recent studies
- **History Page**: Timeline of all entries with search/filters
- **Skills Page**: All skills with pie chart analysis

### Searching & Filtering

**History Page:**
- Type in search box to find entries
- Click filter buttons (All/Events/Skills/Study)
- Select date range and click Apply
- All filters work together

**Skills Page:**
- Search by skill name, category, or level
- Results update in real-time

### Deleting Data

1. Click 🗑️ button on any item
2. Confirmation modal appears
3. Review the item name
4. Click "Yes, Delete" to confirm
5. Item is permanently removed

## 🗃️ Data Structure

### Event Object:
```json
{
  "id": 1704193200000.123,
  "type": "event",
  "date": "2026-01-02",
  "time": "09:00",
  "title": "Morning workout",
  "description": "45-minute cardio session"
}
```

### Skill Object:
```json
{
  "id": 1704193200000.456,
  "type": "skill",
  "date": "2026-01-02",
  "name": "CSS Grid",
  "category": "programming",
  "level": "intermediate",
  "description": "Learned grid layouts"
}
```

### Study Object:
```json
{
  "id": 1704193200000.789,
  "type": "study",
  "date": "2026-01-02",
  "subject": "Web Development",
  "duration": 2,
  "notes": "Studied CSS Grid and Flexbox"
}
```

## 🛠️ API Reference

### DailyLifeDB Class

```javascript
// Add items
db.addEvent(eventData)
db.addSkill(skillData)
db.addStudy(studyData)

// Get items
db.getEvents()
db.getSkills()
db.getStudies()
db.getAllItems()
db.getTodayEvents()

// Delete items
db.deleteEvent(id)
db.deleteSkill(id)
db.deleteStudy(id)

// Search and filter
db.searchItems(query, type, dateFrom, dateTo)

// Statistics
db.updateStats()
db.getCategoryStats()

// Export/Import
db.exportData()
db.importData(jsonData)
db.clearAllData()
```

## 💡 Advanced Features

### Export Your Data

Open browser console (F12) and run:
```javascript
const data = db.exportData();
console.log(data);
// Copy and save to a file
```

### Import Data

```javascript
const jsonData = '{"events":[],"skills":[],"studies":[]}';
db.importData(jsonData);
```

### Clear All Data

```javascript
db.clearAllData();
```

### View Data in Console

```javascript
console.log(db.getData());
```

## 🔒 Data Security

### Where is data stored?
- Browser localStorage on your computer
- Path: Browser Storage → localStorage → 'dailyLifeData'
- Not sent to any server
- Completely private

### Backup Your Data
1. Open browser console (F12)
2. Run: `console.log(db.exportData())`
3. Copy the JSON output
4. Save to a `.json` file
5. Keep backups regularly

### Restore from Backup
1. Open browser console
2. Copy your backup JSON
3. Run: `db.importData('YOUR_JSON_HERE')`

## 🌐 Upgrading to Real Database (Optional)

Want to access your data from multiple devices? Here's how to upgrade:

### Option 1: Firebase (Free, Easy)
1. Create Firebase account
2. Replace localStorage with Firestore
3. Add authentication
4. Access from anywhere

### Option 2: Your Own Server
1. Create Node.js backend
2. Use MongoDB or PostgreSQL
3. Create REST API
4. Connect frontend to API

### Option 3: PHP + MySQL
1. Create PHP backend
2. Set up MySQL database
3. Create API endpoints
4. Modify JavaScript to use fetch()

## 🐛 Troubleshooting

### Data Not Saving?
- Check browser console for errors (F12)
- Ensure localStorage is enabled
- Try different browser
- Check available storage space

### Data Disappeared?
- Check if you're in private/incognito mode (data doesn't persist)
- Browser cache may have been cleared
- Restore from backup

### Form Not Submitting?
- Check all required fields are filled
- Check browser console for errors
- Refresh page and try again

## 📊 Storage Limits

- **localStorage**: ~5-10MB per domain
- Each entry is ~0.5-1KB
- Can store ~5,000-10,000 entries
- More than enough for daily use!

## 🎯 Best Practices

1. **Regular Backups**: Export data weekly
2. **Test First**: Try adding/deleting test data
3. **Use Search**: Find entries quickly instead of scrolling
4. **Consistent Categories**: Stick to the 5 main categories
5. **Detailed Descriptions**: Write detailed notes for future reference

## 🔄 Migration Guide

### From Old Version (Manual HTML)
1. Open browser console
2. Manually add your old entries using Write page
3. Or create import script with your old data

### Format Old Data
```javascript
const oldEntries = [
  { date: '2026-01-01', time: '09:00', title: 'Event', description: 'Desc' }
];

oldEntries.forEach(entry => {
  db.addEvent(entry);
});
```

## 📚 Learn More

- **JavaScript**: Learn about localStorage API
- **JSON**: Understand data formats
- **CRUD Operations**: Create, Read, Update, Delete
- **REST APIs**: For server integration

## 🎉 You're All Set!

Your Daily Life Tracker now has full database functionality. Start adding your daily activities, skills, and study sessions - they'll all be saved automatically!

**Happy Tracking!** 🚀

