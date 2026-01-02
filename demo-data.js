// Demo Data Generator
// Run this in browser console to populate with sample data
// Usage: Open browser console (F12) and paste this entire file

function generateDemoData() {
    console.log('🎯 Generating demo data...');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    // db.clearAllData();
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    // Sample Events
    const events = [
        {
            date: formatDate(today),
            time: '09:00',
            title: 'Morning workout',
            description: 'Completed 45-minute cardio session at the gym. Feeling energized!'
        },
        {
            date: formatDate(today),
            time: '14:00',
            title: 'Team meeting',
            description: 'Weekly project sync-up. Discussed progress and next steps.'
        },
        {
            date: formatDate(today),
            time: '19:00',
            title: 'Dinner with family',
            description: 'Quality time with family. Cooked homemade pasta.'
        },
        {
            date: formatDate(yesterday),
            time: '10:00',
            title: 'Doctor appointment',
            description: 'Regular checkup. Everything looks good!'
        },
        {
            date: formatDate(yesterday),
            time: '18:30',
            title: 'Online course',
            description: 'Web development course - Module 5 completed'
        }
    ];
    
    // Sample Skills
    const skills = [
        {
            date: formatDate(today),
            name: 'CSS Grid Layout',
            category: 'programming',
            level: 'intermediate',
            description: 'Learned how to create complex responsive layouts using CSS Grid.'
        },
        {
            date: formatDate(today),
            name: 'HTML5 Forms',
            category: 'programming',
            level: 'advanced',
            description: 'Mastered HTML5 form elements and validation attributes.'
        },
        {
            date: formatDate(yesterday),
            name: 'Python Algorithms',
            category: 'programming',
            level: 'intermediate',
            description: 'Implemented sorting algorithms: Quick Sort and Merge Sort.'
        },
        {
            date: formatDate(twoDaysAgo),
            name: 'Responsive Design',
            category: 'design',
            level: 'advanced',
            description: 'Learned media queries and mobile-first design principles.'
        },
        {
            date: formatDate(twoDaysAgo),
            name: 'JavaScript ES6',
            category: 'programming',
            level: 'intermediate',
            description: 'Explored arrow functions, destructuring, and async/await.'
        },
        {
            date: formatDate(twoDaysAgo),
            name: 'Figma Prototyping',
            category: 'design',
            level: 'beginner',
            description: 'Started learning interface design and prototyping in Figma.'
        },
        {
            date: formatDate(today),
            name: 'Spanish Conversation',
            category: 'language',
            level: 'beginner',
            description: 'Practiced basic conversational phrases with language partner.'
        },
        {
            date: formatDate(yesterday),
            name: 'Project Management',
            category: 'business',
            level: 'intermediate',
            description: 'Learned about Agile methodologies and sprint planning.'
        }
    ];
    
    // Sample Studies
    const studies = [
        {
            date: formatDate(today),
            subject: 'Web Development',
            duration: 2,
            notes: 'Learned about CSS Grid and Flexbox layouts. Created a responsive calendar design using modern CSS techniques.'
        },
        {
            date: formatDate(yesterday),
            subject: 'Algorithms',
            duration: 1.5,
            notes: 'Reviewed sorting algorithms: Bubble sort, Quick sort, and Merge sort. Implemented examples in Python.'
        },
        {
            date: formatDate(twoDaysAgo),
            subject: 'UI/UX Design',
            duration: 1,
            notes: 'Studied color theory and typography principles for better interface design.'
        },
        {
            date: formatDate(today),
            subject: 'JavaScript',
            duration: 2.5,
            notes: 'Deep dive into closures, promises, and async programming patterns.'
        }
    ];
    
    // Add all demo data
    let eventCount = 0, skillCount = 0, studyCount = 0;
    
    events.forEach(event => {
        try {
            db.addEvent(event);
            eventCount++;
        } catch (error) {
            console.error('Error adding event:', error);
        }
    });
    
    skills.forEach(skill => {
        try {
            db.addSkill(skill);
            skillCount++;
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    });
    
    studies.forEach(study => {
        try {
            db.addStudy(study);
            studyCount++;
        } catch (error) {
            console.error('Error adding study:', error);
        }
    });
    
    console.log('✅ Demo data generated successfully!');
    console.log(`📌 Events added: ${eventCount}`);
    console.log(`🎯 Skills added: ${skillCount}`);
    console.log(`📚 Studies added: ${studyCount}`);
    console.log('🔄 Reload the page to see the data!');
    
    return {
        events: eventCount,
        skills: skillCount,
        studies: studyCount,
        total: eventCount + skillCount + studyCount
    };
}

// Auto-run if in browser
if (typeof window !== 'undefined' && typeof db !== 'undefined') {
    console.log('📝 Demo data script loaded!');
    console.log('Run: generateDemoData() to populate with sample data');
} else if (typeof window !== 'undefined') {
    console.error('❌ Database not found! Make sure app.js is loaded first.');
}

