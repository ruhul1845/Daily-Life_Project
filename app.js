// Daily Life Tracker - Data Management System
// LocalStorage-based persistence

class DailyLifeDB {
    constructor() {
        this.storageKey = 'dailyLifeData';
        this.initializeData();
    }

    // Initialize data structure
    initializeData() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                events: [],
                skills: [],
                studies: [],
                stats: {
                    totalSkills: 0,
                    weekSkills: 0,
                    monthSkills: 0
                }
            };
            this.saveData(initialData);
        }
    }

    // Get all data
    getData() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    // Save data
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Add Event
    addEvent(event) {
        const data = this.getData();
        event.id = Date.now() + Math.random();
        event.type = 'event';
        data.events.push(event);
        this.saveData(data);
        return event;
    }

    // Add Skill
    addSkill(skill) {
        const data = this.getData();
        skill.id = Date.now() + Math.random();
        skill.type = 'skill';
        data.skills.push(skill);
        this.updateStats();
        this.saveData(data);
        return skill;
    }

    // Add Study
    addStudy(study) {
        const data = this.getData();
        study.id = Date.now() + Math.random();
        study.type = 'study';
        data.studies.push(study);
        this.saveData(data);
        return study;
    }

    // Delete Event
    deleteEvent(id) {
        const data = this.getData();
        data.events = data.events.filter(e => e.id !== id);
        this.saveData(data);
    }

    // Delete Skill
    deleteSkill(id) {
        const data = this.getData();
        data.skills = data.skills.filter(s => s.id !== id);
        this.updateStats();
        this.saveData(data);
    }

    // Delete Study
    deleteStudy(id) {
        const data = this.getData();
        data.studies = data.studies.filter(s => s.id !== id);
        this.saveData(data);
    }

    // Get Events
    getEvents() {
        return this.getData().events;
    }

    // Get Skills
    getSkills() {
        return this.getData().skills;
    }

    // Get Studies
    getStudies() {
        return this.getData().studies;
    }

    // Get all items sorted by date
    getAllItems() {
        const data = this.getData();
        const allItems = [
            ...data.events,
            ...data.skills,
            ...data.studies
        ];
        return allItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Get events by date
    getEventsByDate(date) {
        return this.getEvents().filter(e => e.date === date);
    }

    // Get today's events
    getTodayEvents() {
        const today = new Date().toISOString().split('T')[0];
        return this.getEventsByDate(today);
    }

    // Update statistics
    updateStats() {
        const data = this.getData();
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        data.stats.totalSkills = data.skills.length;
        data.stats.weekSkills = data.skills.filter(s => 
            new Date(s.date) >= weekAgo
        ).length;
        data.stats.monthSkills = data.skills.filter(s => 
            new Date(s.date) >= monthAgo
        ).length;

        this.saveData(data);
        return data.stats;
    }

    // Get category statistics
    getCategoryStats() {
        const skills = this.getSkills();
        const categories = {};
        
        skills.forEach(skill => {
            const category = skill.category || 'Other';
            categories[category] = (categories[category] || 0) + 1;
        });

        return categories;
    }

    // Search items
    searchItems(query, type = 'all', dateFrom = null, dateTo = null) {
        let items = this.getAllItems();

        // Filter by type
        if (type !== 'all') {
            items = items.filter(item => item.type === type);
        }

        // Filter by search query
        if (query) {
            query = query.toLowerCase();
            items = items.filter(item => {
                const searchText = JSON.stringify(item).toLowerCase();
                return searchText.includes(query);
            });
        }

        // Filter by date range
        if (dateFrom) {
            items = items.filter(item => item.date >= dateFrom);
        }
        if (dateTo) {
            items = items.filter(item => item.date <= dateTo);
        }

        return items;
    }

    // Clear all data (for testing)
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        this.initializeData();
    }

    // Export data as JSON
    exportData() {
        return JSON.stringify(this.getData(), null, 2);
    }

    // Import data from JSON
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.saveData(data);
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }
}

// Create global database instance
const db = new DailyLifeDB();

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DailyLifeDB, db, formatDate, formatTime, showNotification };
}

