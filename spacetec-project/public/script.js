// Chatbot functionality
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');

sendChatBtn.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addChatMessage('User', userMessage);
        chatInput.value = '';
        try {
            const response = await fetch('/get-ai-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();
            addChatMessage('SpaceTec', data.response);
        } catch (error) {
            console.error('Error:', error);
            addChatMessage('SpaceTec', 'Sorry, there was an error processing your request.');
        }
    }
});

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendChatBtn.click();
    }
});

function addChatMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get the join button, invasion status display, and AI activation button elements
const joinBtn = document.getElementById('join-btn');
const statusDisplay = document.getElementById('status-display');
const activateAIBtn = document.getElementById('activate-ai');

// Simulate invasion status update
function updateInvasionStatus() {
    const statuses = ['Under Attack', 'Safe for Now', 'Evacuating', 'All Clear', 'High Alert'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[randomIndex];
    statusDisplay.textContent = `Invasion Status: ${status}`;
}

// Update invasion status every 5 seconds
setInterval(updateInvasionStatus, 5000);

// Handle join button click
joinBtn.addEventListener('click', () => {
    alert('Thank you for joining the resistance! We will be in touch soon.');
});

// Handle AI activation button click
activateAIBtn.addEventListener('click', () => {
    const aiContainer = document.createElement('div');
    aiContainer.id = 'ai-container';

    const aiTitle = document.createElement('h3');
    aiTitle.textContent = 'SpaceTec AI Assistant';
    aiContainer.appendChild(aiTitle);

    const aiInput = document.createElement('input');
    aiInput.type = 'text';
    aiInput.placeholder = 'Enter your query or emergency...';
    aiContainer.appendChild(aiInput);

    const aiSubmitBtn = document.createElement('button');
    aiSubmitBtn.textContent = 'Submit';
    aiContainer.appendChild(aiSubmitBtn);

    const aiCloseBtn = document.createElement('button');
    aiCloseBtn.textContent = 'Close';
    aiCloseBtn.style.backgroundColor = '#f44336';
    aiCloseBtn.style.color = '#fff';
    aiCloseBtn.style.border = 'none';
    aiCloseBtn.style.padding = '10px 20px';
    aiCloseBtn.style.borderRadius = '5px';
    aiCloseBtn.style.cursor = 'pointer';
    aiCloseBtn.style.transition = 'all 0.3s ease';
    aiCloseBtn.style.marginRight = '10px';

    aiCloseBtn.addEventListener('mouseover', () => {
        aiCloseBtn.style.backgroundColor = '#e53935';
    });

    aiCloseBtn.addEventListener('mouseout', () => {
        aiCloseBtn.style.backgroundColor = '#f44336';
    });

    aiContainer.appendChild(aiCloseBtn);

    const aiResponse = document.createElement('p');
    aiResponse.id = 'ai-response';
    aiContainer.appendChild(aiResponse);

    document.body.appendChild(aiContainer);

    aiSubmitBtn.addEventListener('click', async () => {
        const query = aiInput.value.trim();
        if (query) {
            try {
                const response = await fetch('/get-ai-response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: query }),
                });
                const data = await response.json();
                aiResponse.textContent = data.response;
            } catch (error) {
                console.error('Error:', error);
                aiResponse.textContent = 'Sorry, there was an error processing your request.';
            }
        }
    });

    aiCloseBtn.addEventListener('click', () => {
        document.body.removeChild(aiContainer);
    });
});

// bubble
document.addEventListener('DOMContentLoaded', () => {
    const bubbleContainer = document.getElementById('bubble-container');
    const bubbleImageSrc = 'https://media.gettyimages.com/id/518493243/photo/bubble.jpg?s=612x612&w=0&k=20&c=4jEVfufIXw6a_EQhg5F4Pcgodj90pIay_lufy5itePY=';
    const numberOfBubbles = 20;

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.backgroundImage = `url(${bubbleImageSrc})`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubbleContainer.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 5000);
    }

    function generateBubbles() {
        for (let i = 0; i < numberOfBubbles; i++) {
            setTimeout(createBubble, Math.random() * 5000);
        }
    }

    generateBubbles();
    setInterval(generateBubbles, 5000);

    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 2); // Centered on the world view

    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icons for safe and unsafe zones
    const safeIcon = L.icon({
        iconUrl: 'https://static.vecteezy.com/system/resources/thumbnails/010/977/110/small_2x/blue-gradient-circle-free-png.png', 
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

    const unsafeIcon = L.icon({
        // iconUrl: 'https://media.gettyimages.com/id/1468131701/vector/abstract-design-with-circles-and-purple-gradients-trendy-background.jpg?s=612x612&w=0&k=20&c=ECQTt3KNH2LhAzlMP6ZWGrf0EG7YKxFd3K2thSlu8vM=', 
        iconUrl: 'https://th.bing.com/th/id/OIP.UJxqkVHFPLtwc2E6qcTuxQAAAA?rs=1&pid=ImgDetMain',  
        // iconUrl: '/assets/red_spot.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

    // Define safe zones and alien-infected areas with range
    const locations = [
        { lat: 40.712776, lon: -74.005974, type: 'safe', name: 'New York Safe Zone', range: 5000 },
        { lat: 34.052235, lon: -118.243683, type: 'infected', name: 'Los Angeles Alien Infected', range: 8000 },
        { lat: 51.507351, lon: -0.127758, type: 'safe', name: 'London Safe Zone', range: 4000 },
        { lat: 35.689487, lon: 139.691711, type: 'infected', name: 'Tokyo Alien Infected', range: 6000 },
        { lat: 28.704060, lon: 77.102493, type: 'safe', name: 'Delhi Safe Zone', range: 7000 },
        { lat: 55.755825, lon: 37.617298, type: 'infected', name: 'Moscow Alien Infected', range: 9000 },
        { lat: -33.868820, lon: 151.209296, type: 'safe', name: 'Sydney Safe Zone', range: 4500 },
        { lat: -23.550520, lon: -46.633308, type: 'infected', name: 'São Paulo Alien Infected', range: 10000 },
        { lat: 39.904202, lon: 116.407394, type: 'infected', name: 'Beijing Alien Infected', range: 8500 },
        { lat: 19.432608, lon: -99.133209, type: 'safe', name: 'Mexico City Safe Zone', range: 3000 }
    ];

    // Add markers and circles to the map
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lon], {
            icon: location.type === 'safe' ? safeIcon : unsafeIcon
        }).addTo(map);

        marker.bindPopup(`<b>${location.name}</b><br>${location.type === 'safe' ? 'Safe Zone' : 'Alien Infected Area'}`);

        // Add circles to indicate range
        const circle = L.circle([location.lat, location.lon], {
            color: location.type === 'safe' ? 'green' : 'red',
            fillColor: location.type === 'safe' ? '#0f0' : '#f03',
            fillOpacity: 0.5,
            radius: location.range
        }).addTo(map);
    });
        
    // locations.forEach(location => {
    //     const marker = L.marker([location.lat, location.lon]).addTo(map);
    //     marker.bindPopup(`<b>${location.name}</b><br>${location.type === 'safe' ? 'Safe Zone' : 'Alien Infected Area'}`);
    // });

    // Add survival tips
    const survivalTips = [
        "Tip 1: Always keep dogs around you as they scare the aliens.",
        "Tip 2: Wear bright colors to confuse the aliens.",
        "Tip 3: Wear tinfoil hats; it blocks their mind control rays.",
        "Tip 4: Play loud polka music; it messes with their brainwaves.",
        "Tip 5: Paint alien eyes on your walls; they’ll think they’re being watched.",
        "Tip 6: Use mirrors to reflect alien beams back at them.",
        "Tip 7: Aliens are terrified of rubber chickens. Keep one handy."
    ];

    const tipsContainer = document.getElementById('tips-container');

    survivalTips.forEach((tip, index) => {
        const tipElement = document.createElement('div');
        tipElement.classList.add('tip');
        tipElement.textContent = tip;
        tipsContainer.appendChild(tipElement);
    });

});

// mode
const body = document.querySelector('body');
const toggleModeBtn = document.querySelector('#toggle-mode-btn');

toggleModeBtn.addEventListener('click', () => {
    body.classList.toggle('bright-mode');
    body.classList.toggle('dark-mode');
});