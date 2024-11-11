const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
  const userInput = chatInput.value.trim();
  if (userInput) {
    displayMessage('user', userInput);
    chatInput.value = '';

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
      });

      const data = await response.json();
      displayMessage('chatbot', data.response);
    } catch (error) {
      console.error('Error:', error);
      displayMessage('chatbot', 'Oops, something went wrong. Please try again later.');
    }
  }
});

function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = `${sender === 'user' ? 'You: ' : 'Chatbot: '}${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
