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


// or
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

async function fetchBotResponse(userMessage) {
    try {
        // Replace this with actual API call
        const response = await getBotResponse(userMessage);
        addChatMessage('SpaceTec', response);
    } catch (error) {
        addChatMessage('SpaceTec', 'Sorry, there was an error processing your request.');
    }
}

async function getBotResponse(userMessage) {
    // Simple bot logic (replace with actual API call)
    const responses = {
        help: 'How can I assist you?',
        status: 'The current status is: Safe for Now.',
        default: 'Thank you for your message. We will get back to you shortly.',
    };

    // Simulate an API response delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = responses[userMessage.toLowerCase()] || responses.default;
            resolve(response);
        }, 1000);
    });
}
// or ..

// function addChatMessage(sender, message) {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('chat-message');
//     messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
//     chatMessages.appendChild(messageElement);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function getBotResponse(userMessage) {
//     // Simple bot logic (replace with actual logic or API call)
//     if (userMessage.toLowerCase().includes('help')) {
//         return 'How can I assist you?';
//     } else if (userMessage.toLowerCase().includes('status')) {
//         return 'The current status is: Safe for Now.';
//     } else {
//         return 'Thank you for your message. We will get back to you shortly.';
//     }
// }


// for api integration
async function fetchBotResponse(userMessage) {
    try {
        const response = await fetch('https://api.example.com/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY', // if needed
            },
            body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        addChatMessage('SpaceTec', data.response);
    } catch (error) {
        addChatMessage('SpaceTec', 'Sorry, there was an error processing your request.');
    }
}

// end

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
    aiCloseBtn.style.backgroundColor = '#f44336'; // Red for close button
    aiCloseBtn.style.color = '#fff';
    aiCloseBtn.style.border = 'none';
    aiCloseBtn.style.padding = '10px 20px';
    aiCloseBtn.style.borderRadius = '5px';
    aiCloseBtn.style.cursor = 'pointer';
    aiCloseBtn.style.transition = 'all 0.3s ease';
    aiCloseBtn.style.marginRight = '10px';

    aiCloseBtn.addEventListener('mouseover', () => {
        aiCloseBtn.style.backgroundColor = '#e53935'; // Darker red for close button on hover
    });

    aiCloseBtn.addEventListener('mouseout', () => {
        aiCloseBtn.style.backgroundColor = '#f44336'; // Red for close button
    });

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


// script.js
const userInput = document.getElementById('chat-input').value;
const sendButton = document.getElementById('send-chat-btn');

sendButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/get-response', {
      method: 'POST',
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    // Update chat interface with data.response
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
  }
});
