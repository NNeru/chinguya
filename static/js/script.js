function displayMessage(sender, message) {
    let chatMessages = document.getElementById('chat-messages');
    let formattedMessage = `<div><strong>${sender}:</strong> ${message}</div>`;
    chatMessages.innerHTML += formattedMessage;
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
}

function sendMessage() {
    let userInput = document.getElementById('user-input').value;
    if (userInput) {
        displayMessage('User', userInput);

        fetch('/interact_with_llm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: userInput })
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                displayMessage('Chingu-ya', data.response);
            } else {
                displayMessage('Chingu-ya', 'Sorry, I encountered an error.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            displayMessage('Chingu-ya', 'Sorry, I encountered an error.');
        });

        document.getElementById('user-input').value = '';
    }
}
