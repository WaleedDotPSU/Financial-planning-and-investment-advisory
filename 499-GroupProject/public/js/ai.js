// Update the chat form event listener to handle investment-related queries
document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted");
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;
    console.log("User input:", userInput);

    var botResponse = getBotResponse(userInput);
    console.log("Bot response:", botResponse);

    displayMessage(userInput, 'user-message');
    displayMessage(botResponse, 'bot-message');

    document.getElementById('user-input').value = '';
});

function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();
    for (var key in responses) {
        if (userInput.includes(key)) {
            if (typeof responses[key] === 'function') {
                return responses[key](userInput);
            } else {
                return responses[key];
            }
        }
    }
    return responses['default'];
}

// Add a function to handle investment advice based on user inputs
function handleInvestmentAdvice(userInput) {
    var advice = getBotResponse(userInput);
    if (advice === 'I\'m sorry, I didn\'t understand that.') {
        advice = "I'm sorry, I couldn't provide advice for that. Could you please ask something else?";
    }
    return advice;
}

// Add a function to handle investment suggestion based on user input
function handleInvestmentSuggestion(userInput) {
    var amount = parseInt(userInput.match(/\d+/)); // Extract the amount from the user input
    if (!isNaN(amount)) {
        return responses['investment suggestion'](amount);
    } else {
        return "Please provide a valid amount.";
    }
}

// Update the responses object to include investment suggestion and expected return
var responses = {
    'hi': 'Hello!',
    'hello': 'Hello!',
    'suggestions': 'Sure! Please provide the amount you want to invest.', // Changed the trigger phrase here
    'suggesstions': 'Sure! Please provide the amount you want to invest.',
    'sugestions': 'Sure! Please provide the amount you want to invest.',
    'sugesttion': 'Sure! Please provide the amount you want to invest.',
    'sugguestion': 'Sure! Please provide the amount you want to invest.',
    'suggetsions': 'Sure! Please provide the amount you want to invest.',
    'sugguestion': 'Sure! Please provide the amount you want to invest.',
    'suggustions': 'Sure! Please provide the amount you want to invest.',
    'sugestion': 'Sure! Please provide the amount you want to invest.',
    'suggetion': 'Sure! Please provide the amount you want to invest.',
    'suggections': 'Sure! Please provide the amount you want to invest.',
    'investment suggestion': handleInvestmentSuggestion,
    'expected return': `You can expect a return of ${Math.floor(Math.random() * 21) + 10}%.`,
    'default': 'I\'m sorry, I didn\'t understand that.'
};

function displayMessage(message, className) {
    var chatContainer = document.querySelector('.chat-container');
    var chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', className);
    chatMessage.textContent = message;
    chatContainer.insertBefore(chatMessage, chatContainer.lastElementChild);
}
