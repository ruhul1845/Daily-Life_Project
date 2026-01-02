# 📅 Daily Life Tracker

A beautiful, feature-rich website to track your daily events, skills, and study sessions with **persistent data storage** using localStorage.

## 🌟 Features

- **Home Page**: Interactive calendar showing current month with event indicators and delete functionality for events and study logs
- **Write Page**: Forms to add daily events, new skills, and study sessions
- **History Page**: Timeline view with search, filter by type (Events/Skills/Study), date range filtering, and delete functionality
- **Daily Skills Page**: Track skills with animated pie chart analysis, category progress bars, search functionality, and delete options
- **Search & Filter**: Real-time search across all entries by keyword, date, or category
- **Delete with Confirmation**: Safe deletion with "Are you sure?" modal confirmation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Beautiful transitions and hover effects throughout

## 📂 Files

### HTML Pages:
- `index.html` - Home page with calendar and dynamic data loading
- `write.html` - Write page with functional forms that save data
- `history.html` - History timeline with search, filters, and delete
- `skills.html` - Skills tracking with pie chart analysis

### JavaScript (NEW!):
- `app.js` - Core database management system (localStorage)
- `index-loader.js` - Dynamically loads home page data
- `write-handler.js` - Handles form submissions and saves data
- `history-loader.js` - Loads and filters history entries
- `skills-loader.js` - Loads skills and generates pie chart

### Styling:
- `styles.css` - All styling, animations, and responsive design

### Assets:
- `img/` - Images folder (life.jpg, routine.jpg)

### Documentation:
- `README.md` - Main documentation (this file)
- `README-DATABASE.md` - Detailed database system guide

## 🚀 How to Use

### Getting Started
1. Open `index.html` in your web browser to view the home page
2. Use the navigation bar to switch between pages
3. Go to **Write** page to add your first entry
4. Data is automatically saved to your browser!

### 📝 **Adding Data (NEW!)**

#### Write Page - Three Forms:
1. **Daily Event Form**
   - Select date and time
   - Enter event title and description
   - Click "Add Event" - Done! ✅

2. **New Skill Form**
   - Select date
   - Enter skill name
   - Choose category (Programming, Design, Language, Business, Other)
   - Select proficiency level (Beginner, Intermediate, Advanced)
   - Add description
   - Click "Add Skill" - Saved! ✅

3. **Study Session Form**
   - Select date
   - Enter subject
   - Add duration in hours
   - Write study notes
   - Click "Add Study Log" - Logged! ✅

**All data is automatically saved and will appear on the Home, History, and Skills pages!**

### 🔍 Search & Filter Features

#### History Page:
- **Keyword Search**: Type in the search box to find entries by name, description, or category
- **Filter by Type**: Click "All", "Events", "Skills", or "Study" buttons to filter entries
- **Date Range Filter**: Select "From" and "To" dates, then click "Apply" to filter by date range
- **Combine Filters**: Use search and filters together for precise results

#### Skills Page:
- **Search Skills**: Type in the search box to find skills by name, category, or proficiency level
- **Real-time Results**: Results update as you type

### 🗑️ Delete Functionality

#### On Any Page:
1. Click the 🗑️ delete button next to any item (event, skill, or study entry)
2. A confirmation modal will appear asking "Are you sure?"
3. Review the item name in the modal
4. Click "Yes, Delete" to confirm or "Cancel" to keep the item
5. Deleted items fade out with animation

**Safety Features:**
- Always shows confirmation before deleting
- Displays item name in the confirmation modal
- Warning message: "This action cannot be undone!"
- Click outside modal or "Cancel" to abort deletion

### Adding Daily Entries

#### ✍️ Write Page
Navigate to the Write page to add new entries:

**Daily Event:**
- Enter date and time
- Add event title
- Write description in the text area

**New Skill:**
- Select date
- Enter skill name
- Choose category (Programming, Design, Language, Business, Other)
- Select proficiency level (Beginner, Intermediate, Advanced)
- Describe what you learned

**Study Session:**
- Enter date and subject
- Add duration (in hours)
- Write your study notes in the text area

### 💾 **Data Persistence (NEW!)**

Your data is now **automatically saved**! No need to manually edit HTML files.

- **Automatic Saving**: Forms save to browser localStorage
- **Persistent Storage**: Data survives browser restarts
- **Dynamic Loading**: All pages load data automatically
- **Real-time Updates**: Changes appear immediately

### 📊 **Viewing Your Data**

- **Home Page**: Today's events, top 5 skills, recent 3 studies
- **History Page**: Complete timeline of all entries
- **Skills Page**: All skills with pie chart and category analysis

### 🔄 **Backup Your Data**

Open browser console (F12) and run:
```javascript
const backup = db.exportData();
console.log(backup); // Copy and save this
```

Restore from backup:
```javascript
db.importData('YOUR_BACKUP_JSON_HERE');
```

## 🎨 Customization

### Colors
The main color scheme uses purple gradients. To change:
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (dark purple)

Find these colors in `styles.css` and replace them with your preferred colors.

### Calendar
To update the calendar for a new month:
1. Change the month name in the `<h2>` tag
2. Update the day numbers in the calendar grid
3. Adjust empty days at the start/end using `<div class="day empty"></div>`
4. Mark today with `class="day today"`

## 💡 Tips

- **Daily Updates**: Use the Write page daily for best results
- **Regular Backups**: Export your data weekly using the console
- **Search Everything**: Use search to find entries quickly
- **Filter Smart**: Combine search with type and date filters
- **Delete Carefully**: Deleted items are permanently removed (no undo!)
- **Detailed Entries**: Write detailed descriptions for better future reference
- **Categories**: Stick to the 5 main skill categories for better analysis
- **Browser Storage**: Don't use private/incognito mode (data won't persist)
- **Check Console**: Press F12 to see any errors or debug information

## 📝 Example Daily Workflow

1. **Morning**: Open Write page, add planned events for today
2. **Throughout Day**: Log new skills as you learn them
3. **Evening**: Add study session with what you learned
4. **View Progress**: Check Home page for today's summary
5. **Weekly Review**: Go to History page, filter by week, review progress
6. **Monthly Analysis**: Check Skills page pie chart for category distribution
7. **Backup**: Export data weekly to keep safe copies

## 🔧 Technical Notes

- **HTML/CSS with JavaScript**: Uses vanilla JavaScript for all functionality
- **localStorage Database**: Persistent browser storage (5-10MB capacity)
- **No Server Required**: Everything runs locally in your browser
- **Responsive Design**: Works on all screen sizes
- **Modern Browser Required**: Best experience in Chrome, Edge, Firefox, or Safari
- **Animations**: Smooth CSS animations and transitions throughout
- **Modal System**: Custom delete confirmation modals with backdrop blur
- **Canvas API**: Used for animated pie chart rendering

### JavaScript Features:
- Real-time search filtering
- Category-based filtering
- Date range filtering
- Delete confirmation system
- Smooth animations on delete
- Modal management (open/close/click-outside)
- **Animated Pie Chart**: Canvas-based donut chart with smooth animation
- **Interactive Chart**: Hover effects and visual feedback
- **Data Visualization**: Real-time visual analysis of skill distribution

## 📱 Browser Support

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

---

**Happy tracking! Stay organized and productive! 🚀**

