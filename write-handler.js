// Write Page - Form Submission Handler

document.addEventListener('DOMContentLoaded', function() {
    setupEventForm();
    setupSkillForm();
    setupStudyForm();
    setDefaultDates();
});

// Set default dates to today
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
}

// Setup Event Form
function setupEventForm() {
    const form = document.querySelector('.write-form');
    if (!form) return;
    
    const eventForm = document.querySelectorAll('.write-form')[0];
    if (!eventForm) return;
    
    eventForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const eventData = {
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            title: document.getElementById('event-title').value,
            description: document.getElementById('event-description').value
        };
        
        if (!eventData.date || !eventData.time || !eventData.title) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const result = await api.addEvent(eventData);
        if (result && result.success) {
            showNotification('✅ Event added successfully!', 'success');
        } else {
            showNotification('❌ Failed to add event', 'error');
        }
        eventForm.reset();
        setDefaultDates();
    });
}

// Setup Skill Form
function setupSkillForm() {
    const skillForms = document.querySelectorAll('.write-form');
    if (skillForms.length < 2) return;
    
    const skillForm = skillForms[1];
    
    skillForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const skillData = {
            date: document.getElementById('skill-date').value,
            name: document.getElementById('skill-name').value,
            category: document.getElementById('skill-category').value,
            level: document.getElementById('skill-level').value,
            description: document.getElementById('skill-description').value
        };
        
        if (!skillData.date || !skillData.name || !skillData.category || !skillData.level) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const result = await api.addSkill(skillData);
        if (result && result.success) {
            showNotification('✅ Skill added successfully!', 'success');
        } else {
            showNotification('❌ Failed to add skill', 'error');
        }
        skillForm.reset();
        setDefaultDates();
    });
}

// Setup Study Form
function setupStudyForm() {
    const studyForms = document.querySelectorAll('.write-form');
    if (studyForms.length < 3) return;
    
    const studyForm = studyForms[2];
    
    studyForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const studyData = {
            date: document.getElementById('study-date').value,
            subject: document.getElementById('study-subject').value,
            duration: parseFloat(document.getElementById('study-duration').value),
            notes: document.getElementById('study-notes').value
        };
        
        if (!studyData.date || !studyData.subject || !studyData.duration) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const result = await api.addStudy(studyData);
        if (result && result.success) {
            showNotification('✅ Study session logged successfully!', 'success');
        } else {
            showNotification('❌ Failed to log study session', 'error');
        }
        studyForm.reset();
        setDefaultDates();
    });
}

