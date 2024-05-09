document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    var botResponse = getBotResponse(userInput);
    displayMessage(userInput, 'user-message');
    displayMessage(botResponse, 'bot-message');

    document.getElementById('user-input').value = '';
});

function getBotResponse(userInput) {
    // Simple responses based on user input
    var responses = {
        'hi': 'Hello!',
        'how are you?': 'I am doing well, thank you for asking.',
        'what is your name?': 'I am just a simple AI chatbot.',
        'bye': 'Goodbye!',
        'default': 'I\'m sorry, I didn\'t understand that.'
    };

    return responses[userInput.toLowerCase()] || responses['default'];
}

function displayMessage(message, className) {
    var chatContainer = document.querySelector('.chat-container');
    var chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', className);
    chatMessage.textContent = message;
    chatContainer.insertBefore(chatMessage, chatContainer.lastElementChild);
}