// Skills Page - Dynamic Data Loader

document.addEventListener('DOMContentLoaded', function() {
    loadSkillsStats();
    loadDailySkills();
    loadCategoryAnalysis();
    setupSkillSearch();
});

// Load skills statistics
async function loadSkillsStats() {
    const stats = await api.getStats();
    
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = stats.totalSkills;
        statNumbers[1].textContent = stats.weekSkills;
        statNumbers[2].textContent = stats.monthSkills;
    }
}

// Load daily skills
async function loadDailySkills() {
    const skills = await api.getSkills();
    const section = document.querySelector('.daily-skills-section');
    if (!section) return;
    
    // Group skills by date
    const skillsByDate = {};
    skills.forEach(skill => {
        if (!skillsByDate[skill.date]) {
            skillsByDate[skill.date] = [];
        }
        skillsByDate[skill.date].push(skill);
    });
    
    // Clear existing skill cards
    const existingCards = section.querySelectorAll('.day-skills-card');
    existingCards.forEach(card => card.remove());
    
    if (skills.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.style.cssText = 'color: white; text-align: center; padding: 2rem; font-size: 1.1rem;';
        emptyMsg.innerHTML = 'No skills yet. <a href="write.html" style="color: white; text-decoration: underline;">Add your first skill!</a>';
        section.appendChild(emptyMsg);
        return;
    }
    
    // Display skills by date (most recent first)
    Object.keys(skillsByDate).sort((a, b) => new Date(b) - new Date(a)).slice(0, 10).forEach(date => {
        const dayCard = createDaySkillsCard(date, skillsByDate[date]);
        section.appendChild(dayCard);
    });
}

// Create day skills card
function createDaySkillsCard(date, skills) {
    const card = document.createElement('div');
    card.className = 'day-skills-card';
    
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    
    const skillsHTML = skills.map(skill => {
        const icons = {
            'programming': '💻',
            'design': '🎨',
            'language': '🗣️',
            'business': '💼',
            'other': '⭐'
        };
        const icon = icons[skill.category] || '⭐';
        
        return `
            <div class="skill-card" data-skill="${skill.name}" data-skill-id="${skill.id}">
                <div class="skill-icon">${icon}</div>
                <h5>${skill.name}</h5>
                <p class="skill-category">${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</p>
                <p class="skill-desc">${skill.description || 'No description provided'}</p>
                <span class="level-badge ${skill.level}">${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
                <button class="delete-btn skill-delete" onclick="showSkillDeleteConfirm('${skill.id}', '${skill.name}')">🗑️ Delete</button>
            </div>
        `;
    }).join('');
    
    card.innerHTML = `
        <div class="day-header">
            <h4>${formatDate(date)} - ${dayName}</h4>
            <span class="skills-count">${skills.length} skill${skills.length > 1 ? 's' : ''}</span>
        </div>
        <div class="skills-grid">
            ${skillsHTML}
        </div>
    `;
    
    return card;
}

// Load category analysis
async function loadCategoryAnalysis() {
    const categoryStats = await api.getCategoryStats();
    const total = Object.values(categoryStats).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) return;
    
    // Update pie chart
    drawPieChartWithData(categoryStats, total);
    
    // Update progress bars
    const categoryList = document.querySelector('.category-list');
    if (!categoryList) return;
    
    // Clear existing items except title
    const items = categoryList.querySelectorAll('.category-item');
    items.forEach(item => item.remove());
    
    const categoryIcons = {
        'programming': '💻',
        'design': '🎨',
        'language': '🗣️',
        'business': '💼',
        'other': '⭐'
    };
    
    const categoryColors = {
        'programming': '#667eea',
        'design': '#764ba2',
        'language': '#f093fb',
        'business': '#4facfe',
        'other': '#00f2fe'
    };
    
    Object.keys(categoryStats).forEach(category => {
        const count = categoryStats[category];
        const percentage = Math.round((count / total) * 100);
        const icon = categoryIcons[category.toLowerCase()] || '⭐';
        const color = categoryColors[category.toLowerCase()] || '#667eea';
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'category-item';
        itemDiv.innerHTML = `
            <div class="category-header">
                <span class="category-name">${icon} ${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span class="category-count">${count} skill${count > 1 ? 's' : ''}</span>
            </div>
            <div class="category-progress">
                <div class="category-bar" style="width: ${percentage}%; background: linear-gradient(90deg, ${color}, ${color});"></div>
            </div>
        `;
        
        categoryList.appendChild(itemDiv);
    });
    
    // Update legend
    updateChartLegend(categoryStats, total);
}

// Update chart legend
function updateChartLegend(categoryStats, total) {
    const legend = document.querySelector('.chart-legend');
    if (!legend) return;
    
    legend.innerHTML = '';
    
    const categoryColors = {
        'programming': '#667eea',
        'design': '#764ba2',
        'language': '#f093fb',
        'business': '#4facfe',
        'other': '#00f2fe'
    };
    
    Object.keys(categoryStats).forEach(category => {
        const count = categoryStats[category];
        const percentage = Math.round((count / total) * 100);
        const color = categoryColors[category.toLowerCase()] || '#667eea';
        
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <span class="legend-color" style="background: ${color};"></span>
            <span class="legend-text">${category.charAt(0).toUpperCase() + category.slice(1)} (${percentage}%)</span>
        `;
        
        legend.appendChild(item);
    });
}

// Draw pie chart with real data
function drawPieChartWithData(categoryStats, total) {
    const canvas = document.getElementById('skillsPieChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    
    const categoryColors = {
        'programming': '#667eea',
        'design': '#764ba2',
        'language': '#f093fb',
        'business': '#4facfe',
        'other': '#00f2fe'
    };
    
    const data = Object.keys(categoryStats).map(category => ({
        label: category,
        value: categoryStats[category],
        color: categoryColors[category.toLowerCase()] || '#667eea',
        percentage: Math.round((categoryStats[category] / total) * 100)
    }));
    
    let animationProgress = 0;
    const animationDuration = 1500;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        animationProgress = Math.min(elapsed / animationDuration, 1);
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        const progress = easeOutCubic(animationProgress);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let currentAngle = -Math.PI / 2;
        
        data.forEach(item => {
            const sliceAngle = (item.value / total) * 2 * Math.PI * progress;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            if (animationProgress >= 0.8) {
                const textAlpha = (animationProgress - 0.8) * 5;
                const textAngle = currentAngle + sliceAngle / 2;
                const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
                const textY = centerY + Math.sin(textAngle) * (radius * 0.7);
                
                ctx.globalAlpha = textAlpha;
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.percentage + '%', textX, textY);
                ctx.globalAlpha = 1;
            }
            
            currentAngle += sliceAngle;
        });
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(total * progress), centerX, centerY - 10);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Total Skills', centerX, centerY + 15);
        
        if (animationProgress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Setup skill search
function setupSkillSearch() {
    const searchInput = document.getElementById('skill-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Show delete confirmation
window.showSkillDeleteConfirm = function(id, name) {
    skillToDelete = parseFloat(id);
    document.getElementById('deleteSkillName').textContent = name;
    document.getElementById('skillDeleteModal').style.display = 'flex';
};

// Confirm skill delete
window.confirmSkillDelete = async function() {
    if (skillToDelete) {
        const element = document.querySelector(`[data-skill-id="${skillToDelete}"]`);
        
        await api.deleteSkill(skillToDelete);
        
        if (element) {
            element.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                element.remove();
                closeSkillDeleteModal();
                showNotification('Skill deleted successfully!');
                
                // Reload data
                loadSkillsStats();
                loadCategoryAnalysis();
            }, 500);
        }
    }
};

// Close skill delete modal
window.closeSkillDeleteModal = function() {
    document.getElementById('skillDeleteModal').style.display = 'none';
    skillToDelete = null;
};

