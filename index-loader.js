// Index Page - Dynamic Data Loader

document.addEventListener('DOMContentLoaded', function() {
    loadTodayEvents();
    loadSkillsProgress();
    loadRecentStudies();
    updateCalendar();
});

// Load today's events
async function loadTodayEvents() {
    const events = await api.getTodayEvents();
    const entryList = document.querySelector('.entry-list');
    
    if (!entryList) return;
    
    entryList.innerHTML = '';
    
    if (events.length === 0) {
        entryList.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No events for today. <a href="write.html" style="color: #667eea;">Add one!</a></p>';
        return;
    }
    
    events.forEach(event => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.setAttribute('data-event-id', event.id);
        
        entryDiv.innerHTML = `
            <div class="entry-info">
                <span class="time">${formatTime(event.time)}</span>
                <span class="description">${event.title}</span>
            </div>
            <button class="delete-btn-small" onclick="deleteEventFromHome('${event.id}', '${event.title}')">🗑️</button>
        `;
        
        entryList.appendChild(entryDiv);
    });
}

// Load skills progress
async function loadSkillsProgress() {
    const skills = await api.getSkills();
    const skillList = document.querySelector('.skill-list');
    
    if (!skillList) return;
    
    // Group skills by name and calculate average level
    const skillGroups = {};
    skills.forEach(skill => {
        if (!skillGroups[skill.name]) {
            skillGroups[skill.name] = {
                name: skill.name,
                count: 0,
                levels: []
            };
        }
        skillGroups[skill.name].count++;
        skillGroups[skill.name].levels.push(skill.level);
    });
    
    skillList.innerHTML = '';
    
    if (Object.keys(skillGroups).length === 0) {
        skillList.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No skills yet. Start learning!</p>';
        return;
    }
    
    // Display top 5 skills
    const topSkills = Object.values(skillGroups).slice(0, 5);
    
    topSkills.forEach(skillGroup => {
        const levelMap = { 'beginner': 33, 'intermediate': 66, 'advanced': 100 };
        const avgLevel = skillGroup.levels.reduce((sum, level) => 
            sum + levelMap[level], 0) / skillGroup.levels.length;
        
        const levelText = avgLevel < 50 ? 'Beginner' : avgLevel < 80 ? 'Intermediate' : 'Advanced';
        
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skillGroup.name}</span>
                <span class="skill-level">${levelText}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${avgLevel}%"></div>
            </div>
        `;
        
        skillList.appendChild(skillDiv);
    });
}

// Load recent studies
async function loadRecentStudies() {
    const studies = (await api.getStudies()).slice(0, 3);
    const studyList = document.querySelector('.study-list');
    
    if (!studyList) return;
    
    studyList.innerHTML = '';
    
    if (studies.length === 0) {
        studyList.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No study sessions yet. <a href="write.html" style="color: #667eea;">Log your first session!</a></p>';
        return;
    }
    
    studies.forEach(study => {
        const studyDiv = document.createElement('div');
        studyDiv.className = 'study-entry';
        studyDiv.setAttribute('data-study-id', study.id);
        
        studyDiv.innerHTML = `
            <div class="study-content">
                <div class="study-header">
                    <strong>${study.subject}</strong>
                    <span class="study-date">${formatDate(study.date)}</span>
                </div>
                <p>${study.notes || 'No notes provided'}</p>
                <div class="study-duration">⏱️ ${study.duration} hours</div>
            </div>
            <button class="delete-btn-small" onclick="deleteStudyFromHome('${study.id}', '${study.subject}')">🗑️</button>
        `;
        
        studyList.appendChild(studyDiv);
    });
}

// Update calendar with event markers
async function updateCalendar() {
    const events = await api.getEvents();
    const eventDates = new Set(events.map(e => new Date(e.date).getDate()));
    
    document.querySelectorAll('.day').forEach(dayEl => {
        const dayNumber = parseInt(dayEl.textContent);
        if (eventDates.has(dayNumber) && !dayEl.classList.contains('empty')) {
            if (!dayEl.querySelector('.event-dot')) {
                const dot = document.createElement('span');
                dot.className = 'event-dot';
                dayEl.appendChild(dot);
            }
        }
    });
}

// Delete event from home page
function deleteEventFromHome(id, name) {
    itemToDelete = { id: id, type: 'event' };
    document.getElementById('deleteItemName').textContent = name + ' Event';
    document.getElementById('deleteModal').style.display = 'flex';
}

// Delete study from home page
function deleteStudyFromHome(id, name) {
    itemToDelete = { id: id, type: 'study' };
    document.getElementById('deleteItemName').textContent = name + ' Study';
    document.getElementById('deleteModal').style.display = 'flex';
}

// Override confirmDelete for home page
window.confirmDeleteHome = async function() {
    if (itemToDelete) {
        const element = document.querySelector(`[data-${itemToDelete.type}-id="${itemToDelete.id}"]`);
        
        if (itemToDelete.type === 'event') {
            await api.deleteEvent(itemToDelete.id);
        } else if (itemToDelete.type === 'study') {
            await api.deleteStudy(itemToDelete.id);
        }
        
        if (element) {
            element.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                element.remove();
                closeDeleteModal();
                showNotification(`${itemToDelete.type} deleted successfully!`);
            }, 500);
        }
    }
};

