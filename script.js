// Global Variables
let sightings = JSON.parse(localStorage.getItem('sightings')) || [];

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Handle Sighting Form Submission
document.getElementById('sighting-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const sighting = {
        id: Date.now(),
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        type: document.getElementById('ufo-type').value,
        description: document.getElementById('description').value,
        votes: 0
    };
    
    sightings.push(sighting);
    localStorage.setItem('sightings', JSON.stringify(sightings));
    updateSightingsList();
    event.target.reset();
});

// Update Sightings List
function updateSightingsList() {
    const list = document.getElementById('sightings-list');
    list.innerHTML = '';
    
    sightings.sort((a, b) => b.votes - a.votes).forEach(sighting => {
        const element = document.createElement('div');
        element.className = 'sighting-box'; // Apply the retro box class
        element.innerHTML = `
            <h3>🛸 ${sighting.type}</h3>
            <p>📍 ${sighting.location}</p>
            <p>📅 ${sighting.date}</p>
            <p>${sighting.description}</p>
            <div class="votes">
                <button onclick="vote(${sighting.id}, 1)">👍</button>
                <span>${sighting.votes}</span>
                <button onclick="vote(${sighting.id}, -1)">👎</button>
            </div>
        `;
        list.appendChild(element);
    });
}

// Voting System
function vote(id, value) {
    const sighting = sightings.find(s => s.id === id);
    if (sighting) {
        sighting.votes += value;
        localStorage.setItem('sightings', JSON.stringify(sightings));
        updateSightingsList();
    }
}

// Handle Conspiracy Form Submission
document.getElementById('conspiracy-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const theory = event.target.querySelector('textarea').value;
    const conspiracyList = document.getElementById('conspiracy-list');
    conspiracyList.innerHTML += `<div class="conspiracy-box"><p>${theory}</p></div>`;
    event.target.reset();
});

// Soundboard Functionality
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', function() {
        const soundId = this.getAttribute('data-sound');
        const sound = document.getElementById(soundId);
        sound.currentTime = 0; // Reset sound to start
        sound.play();
    });
});

// Toggle Alien Chat
function toggleChat() {
    const chatContainer = document.getElementById('alien-chat');
    chatContainer.classList.toggle('hidden');
}

// Easter Egg Functionality
document.addEventListener('keydown', function(event) {
    if (event.code === 'E' && event.altKey) {
        document.getElementById('easter-egg').style.display = 'block';
    }
});

function closeEasterEgg() {
    document.getElementById('easter-egg').style.display = 'none';
}

// Initialize Sightings List on Page Load
document.addEventListener('DOMContentLoaded', () => {
    updateSightingsList();
});