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
    aiContainer.appendChild(aiCloseBtn);

    const aiResponse = document.createElement('p');
    aiResponse.id = 'ai-response';
    aiContainer.appendChild(aiResponse);

    document.body.appendChild(aiContainer);

    aiSubmitBtn.addEventListener('click', () => {
        const query = aiInput.value.trim();
        if (query) {
            // Replace this with your AI logic or API integration
            const response = `Thank you for your query: "${query}". Our AI is currently analyzing the situation and will provide a response shortly.`;
            aiResponse.textContent = response;
        }
    });

    aiCloseBtn.addEventListener('click', () => {
        document.body.removeChild(aiContainer);
    });
});

// bubble
document.addEventListener('DOMContentLoaded', () => {
    const bubbleContainer = document.getElementById('bubble-container');
    const bubbleImageSrc = 'https://media.gettyimages.com/id/518493243/photo/bubble.jpg?s=612x612&w=0&k=20&c=4jEVfufIXw6a_EQhg5F4Pcgodj90pIay_lufy5itePY='; // Replace with your image URL
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
});

// mode
const body = document.querySelector('body');
const toggleModeBtn = document.querySelector('#toggle-mode-btn');

toggleModeBtn.addEventListener('click', () => {
    body.classList.toggle('bright-mode');
    body.classList.toggle('dark-mode');
});
