document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const chatBubble = document.getElementById('chat-bubble');
    const chatPopup = document.getElementById('chat-popup');
    const closeBtn = document.getElementById('close-btn');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // --- API Configuration ---
    // IMPORTANT: Update this URL when you deploy your Python backend!
    const API_URL = 'http://127.0.0.1:8000/chat';

    // --- Event Listeners ---

    // Toggle chat popup on bubble click
    chatBubble.addEventListener('click', () => {
        chatPopup.style.display = 'flex';
        chatBubble.style.display = 'none';
    });

    // Close chat popup
    closeBtn.addEventListener('click', () => {
        chatPopup.style.display = 'none';
        chatBubble.style.display = 'flex';
    });

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (userMessage === '') return;

        // Display user's message
        addMessage(userMessage, 'user-message');
        userInput.value = '';

        try {
            // Send message to the backend API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            const aiMessage = data.answer;

            // Display AI's response
            addMessage(aiMessage, 'ai-message');

        } catch (error) {
            console.error('Error fetching from API:', error);
            addMessage("Sorry, I'm having trouble connecting. Please try again later.", 'ai-message');
        }
    });

    // --- Helper Functions ---

    /**
     * Adds a message to the chat window and scrolls to the bottom.
     * @param {string} text - The message text.
     * @param {string} className - The CSS class for styling ('user-message' or 'ai-message').
     */
    function addMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);

        // Auto-scroll to the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});