// Daily Life Tracker - API Client
// Communicates with backend server

class DailyLifeAPI {
    constructor() {
        this.baseURL = '';
        this.checkAuth();
    }

    // Check if user is authenticated
    async checkAuth() {
        try {
            const response = await fetch('/api/check-auth');
            const data = await response.json();
            
            if (!data.authenticated) {
                // Redirect to login if not on auth pages
                if (!window.location.pathname.includes('login') && 
                    !window.location.pathname.includes('register')) {
                    window.location.href = '/login.html';
                }
            }
            
            return data;
        } catch (error) {
            console.error('Auth check failed:', error);
            return { authenticated: false };
        }
    }

    // Logout
    async logout() {
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            const data = await response.json();
            
            if (data.success) {
                window.location.href = '/login.html';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    // ===== EVENTS =====
    
    async getEvents() {
        try {
            const response = await fetch('/api/events');
            if (response.status === 401) {
                window.location.href = '/login.html';
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error('Get events failed:', error);
            return [];
        }
    }

    async addEvent(eventData) {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            });
            
            if (response.status === 401) {
                window.location.href = '/login.html';
                return null;
            }
            
            return await response.json();
        } catch (error) {
            console.error('Add event failed:', error);
            return null;
        }
    }

    async deleteEvent(id) {
        try {
            const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            console.error('Delete event failed:', error);
            return null;
        }
    }

    // ===== SKILLS =====
    
    async getSkills() {
        try {
            const response = await fetch('/api/skills');
            if (response.status === 401) {
                window.location.href = '/login.html';
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error('Get skills failed:', error);
            return [];
        }
    }

    async addSkill(skillData) {
        try {
            const response = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skillData)
            });
            
            if (response.status === 401) {
                window.location.href = '/login.html';
                return null;
            }
            
            return await response.json();
        } catch (error) {
            console.error('Add skill failed:', error);
            return null;
        }
    }

    async deleteSkill(id) {
        try {
            const response = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            console.error('Delete skill failed:', error);
            return null;
        }
    }

    // ===== STUDIES =====
    
    async getStudies() {
        try {
            const response = await fetch('/api/studies');
            if (response.status === 401) {
                window.location.href = '/login.html';
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error('Get studies failed:', error);
            return [];
        }
    }

    async addStudy(studyData) {
        try {
            const response = await fetch('/api/studies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studyData)
            });
            
            if (response.status === 401) {
                window.location.href = '/login.html';
                return null;
            }
            
            return await response.json();
        } catch (error) {
            console.error('Add study failed:', error);
            return null;
        }
    }

    async deleteStudy(id) {
        try {
            const response = await fetch(`/api/studies/${id}`, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            console.error('Delete study failed:', error);
            return null;
        }
    }

    // ===== STATISTICS =====
    
    async getStats() {
        try {
            const response = await fetch('/api/stats');
            return await response.json();
        } catch (error) {
            console.error('Get stats failed:', error);
            return { totalSkills: 0, weekSkills: 0, monthSkills: 0 };
        }
    }

    // ===== HELPER FUNCTIONS =====
    
    async getAllItems() {
        const [events, skills, studies] = await Promise.all([
            this.getEvents(),
            this.getSkills(),
            this.getStudies()
        ]);

        const allItems = [
            ...events.map(e => ({ ...e, type: 'event' })),
            ...skills.map(s => ({ ...s, type: 'skill' })),
            ...studies.map(s => ({ ...s, type: 'study' }))
        ];

        return allItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    async getTodayEvents() {
        const events = await this.getEvents();
        const today = new Date().toISOString().split('T')[0];
        return events.filter(e => e.date === today);
    }

    async getCategoryStats() {
        const skills = await this.getSkills();
        const categories = {};
        
        skills.forEach(skill => {
            const category = skill.category || 'other';
            categories[category] = (categories[category] || 0) + 1;
        });

        return categories;
    }

    searchItems(items, query, type = 'all', dateFrom = null, dateTo = null) {
        let filtered = items;

        // Filter by type
        if (type !== 'all') {
            filtered = filtered.filter(item => item.type === type);
        }

        // Filter by search query
        if (query) {
            query = query.toLowerCase();
            filtered = filtered.filter(item => {
                const searchText = JSON.stringify(item).toLowerCase();
                return searchText.includes(query);
            });
        }

        // Filter by date range
        if (dateFrom) {
            filtered = filtered.filter(item => item.date >= dateFrom);
        }
        if (dateTo) {
            filtered = filtered.filter(item => item.date <= dateTo);
        }

        return filtered;
    }
}

// Create global API instance
const api = new DailyLifeAPI();

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

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

// Add logout button to navigation
document.addEventListener('DOMContentLoaded', async () => {
    const authData = await api.checkAuth();
    
    if (authData.authenticated && !window.location.pathname.includes('login') && 
        !window.location.pathname.includes('register')) {
        
        // Add username and logout button to navbar
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            const userInfo = document.createElement('div');
            userInfo.style.cssText = 'display: flex; align-items: center; gap: 1rem; margin-left: auto;';
            userInfo.innerHTML = `
                <span style="color: #667eea; font-weight: 600;">👤 ${authData.user.username}</span>
                <button onclick="api.logout()" style="background: #ff6b6b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600;">Logout</button>
            `;
            
            const navLinks = navbar.querySelector('.nav-links');
            if (navLinks) {
                navbar.style.display = 'flex';
                navbar.style.alignItems = 'center';
                navbar.appendChild(userInfo);
            }
        }
    }
});

