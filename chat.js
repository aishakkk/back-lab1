// chat.js
const eventSource = new EventSource('/sse');
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

eventSource.onmessage = function (event) {
  const newMessage = document.createElement('p');
  newMessage.textContent = event.data;
  messagesDiv.appendChild(newMessage);
};

messageForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() !== '') {
    fetch(`/chat?message=${encodeURIComponent(message)}`)
      .then(response => response.text())
      .then(() => {
        messageInput.value = '';
      })
      .catch(error => console.error('Error sending message:', error));
  }
});
