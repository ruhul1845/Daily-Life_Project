// History Page - Dynamic Data Loader

document.addEventListener('DOMContentLoaded', function() {
    loadAllHistory();
    setupSearchAndFilters();
});

// Load all history items
async function loadAllHistory() {
    const items = await api.getAllItems();
    displayHistoryItems(items);
}

// Display history items
function displayHistoryItems(items) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    // Clear existing items (keep date headers logic)
    const existingItems = timeline.querySelectorAll('.timeline-item');
    existingItems.forEach(item => item.remove());
    
    const existingDates = timeline.querySelectorAll('.timeline-date');
    existingDates.forEach(date => date.remove());
    
    const emptyMsg = timeline.querySelector('.timeline-empty');
    if (emptyMsg) emptyMsg.remove();
    
    if (items.length === 0) {
        timeline.innerHTML = `
            <div class="timeline-empty">
                <p>📝 Start adding entries in the <a href="write.html">Write</a> section to build your history!</p>
            </div>
        `;
        return;
    }
    
    // Group items by date
    const itemsByDate = {};
    items.forEach(item => {
        const date = item.date;
        if (!itemsByDate[date]) {
            itemsByDate[date] = [];
        }
        itemsByDate[date].push(item);
    });
    
    // Display items grouped by date
    Object.keys(itemsByDate).sort((a, b) => new Date(b) - new Date(a)).forEach(date => {
        // Add date header
        const dateHeader = document.createElement('div');
        dateHeader.className = 'timeline-date';
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        dateHeader.innerHTML = `<h3>${formatDate(date)} - ${dayName}</h3>`;
        timeline.appendChild(dateHeader);
        
        // Add items for this date
        itemsByDate[date].forEach(item => {
            const itemEl = createTimelineItem(item);
            timeline.appendChild(itemEl);
        });
    });
}

// Create timeline item element
function createTimelineItem(item) {
    const div = document.createElement('div');
    div.className = `timeline-item ${item.type}-item`;
    div.setAttribute('data-type', item.type);
    div.setAttribute('data-date', item.date);
    div.setAttribute('data-item-id', item.id);
    
    let markerIcon, markerClass, badgeClass, badgeText, content;
    
    if (item.type === 'event') {
        markerIcon = '📌';
        markerClass = 'event-marker';
        badgeClass = 'event-badge';
        badgeText = 'Event';
        content = `
            <div class="timeline-header">
                <span class="timeline-badge ${badgeClass}">${badgeText}</span>
                <span class="timeline-time">${formatTime(item.time)}</span>
            </div>
            <h4>${item.title}</h4>
            <p>${item.description || 'No description'}</p>
        `;
    } else if (item.type === 'skill') {
        markerIcon = '🎯';
        markerClass = 'skill-marker';
        badgeClass = 'skill-badge';
        badgeText = 'Skill';
        content = `
            <div class="timeline-header">
                <span class="timeline-badge ${badgeClass}">${badgeText}</span>
                <span class="timeline-time">${item.category}</span>
            </div>
            <h4>${item.name}</h4>
            <p>${item.description || 'No description'}</p>
            <span class="skill-level-tag">${item.level.charAt(0).toUpperCase() + item.level.slice(1)}</span>
        `;
    } else if (item.type === 'study') {
        markerIcon = '📚';
        markerClass = 'study-marker';
        badgeClass = 'study-badge';
        badgeText = 'Study';
        content = `
            <div class="timeline-header">
                <span class="timeline-badge ${badgeClass}">${badgeText}</span>
                <span class="timeline-time">⏱️ ${item.duration} hours</span>
            </div>
            <h4>${item.subject}</h4>
            <p>${item.notes || 'No notes'}</p>
        `;
    }
    
    div.innerHTML = `
        <div class="timeline-marker ${markerClass}">${markerIcon}</div>
        <div class="timeline-content">
            ${content}
            <button class="delete-btn" onclick="showHistoryDeleteConfirm('${item.id}', '${item.name || item.title || item.subject}', '${item.type}')">🗑️ Delete</button>
        </div>
    `;
    
    return div;
}

// Setup search and filters
function setupSearchAndFilters() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            performSearch();
        });
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            performSearch();
        });
    });
    
    // Date range filter
    const applyBtn = document.querySelector('.filter-apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', performSearch);
    }
}

// Perform search with all filters
async function performSearch() {
    const query = document.getElementById('search-input')?.value || '';
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const dateFrom = document.getElementById('date-from')?.value || null;
    const dateTo = document.getElementById('date-to')?.value || null;
    
    const allItems = await api.getAllItems();
    const results = api.searchItems(allItems, query, activeFilter, dateFrom, dateTo);
    displayHistoryItems(results);
}

// Show delete confirmation
window.showHistoryDeleteConfirm = function(id, name, type) {
    itemToDelete = { id: parseFloat(id), type: type };
    document.getElementById('deleteItemName').textContent = name;
    document.getElementById('deleteModal').style.display = 'flex';
};

// Override confirmDelete for history page
window.confirmDelete = async function() {
    if (itemToDelete) {
        const element = document.querySelector(`[data-item-id="${itemToDelete.id}"]`);
        
        if (itemToDelete.type === 'event') {
            await api.deleteEvent(itemToDelete.id);
        } else if (itemToDelete.type === 'skill') {
            await api.deleteSkill(itemToDelete.id);
        } else if (itemToDelete.type === 'study') {
            await api.deleteStudy(itemToDelete.id);
        }
        
        if (element) {
            element.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                element.remove();
                closeDeleteModal();
                showNotification('Item deleted successfully!');
                
                // Reload if no items left in this date
                const timeline = document.querySelector('.timeline');
                if (timeline.querySelectorAll('.timeline-item').length === 0) {
                    loadAllHistory();
                }
            }, 500);
        }
    }
};

