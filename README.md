# 📅 Daily Life Tracker

A beautiful, minimalist website to track your daily events, skills, and study sessions using only HTML and CSS.

## 🌟 Features

- **Home Page**: Interactive calendar showing current month with event indicators
- **Write Page**: Forms to add daily events, new skills, and study sessions
- **History Page**: Timeline view of all your past entries
- **Daily Skills Page**: Track skills you learn each day organized by date
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📂 Files

- `index.html` - Home page with calendar
- `write.html` - Write page with input forms
- `history.html` - History timeline page
- `skills.html` - Daily skills tracking page
- `styles.css` - All styling for the website

## 🚀 How to Use

### Getting Started
1. Open `index.html` in your web browser to view the home page
2. Use the navigation bar to switch between pages

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

### Updating Daily

To update your daily tracking:

1. **Update Calendar** (in `index.html`):
   - Find the calendar section
   - Update the month/year in the `<h2>` tag
   - Modify day numbers as needed
   - Add `<span class="event-dot"></span>` inside days with events

2. **Add New Events** (in `index.html`):
   ```html
   <div class="entry">
       <span class="time">02:00 PM</span>
       <span class="description">Your event here</span>
   </div>
   ```

3. **Update History** (in `history.html`):
   - Copy existing timeline items as templates
   - Change dates, times, and descriptions
   - Keep timeline items organized by date (newest first)

4. **Add Daily Skills** (in `skills.html`):
   - Copy skill card templates
   - Update with new skills learned
   - Organize by day under day-skills-card sections

5. **Update Skill Progress** (in `index.html`):
   - Find the skill-item sections
   - Change the `style="width: 85%"` value to reflect progress

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

- **Consistency**: Update the website daily for best results
- **Backup**: Keep copies of your files as you update them
- **Forms**: The forms on the Write page are templates - you'll manually copy the data to the History and Skills pages
- **Organization**: Keep entries in reverse chronological order (newest first)

## 📝 Example Daily Workflow

1. Open `write.html` in the morning
2. Fill out forms with your plans and new skills
3. At end of day, copy your entries to `history.html` and `skills.html`
4. Update calendar in `index.html` to mark the day with an event dot
5. Update skill progress bars if you made progress

## 🔧 Technical Notes

- Pure HTML/CSS - no JavaScript required
- No database - you edit the HTML files directly
- Responsive design works on all screen sizes
- Modern browser required for best experience

## 📱 Browser Support

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

---

**Happy tracking! Stay organized and productive! 🚀**

