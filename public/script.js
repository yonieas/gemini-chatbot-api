// Configure marked to use highlight.js for code blocks
if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  });
}
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Add a typing indicator
  const typingIndicator = appendMessage('bot', 'Gemini AI is thinking...', 'typing-indicator');

  // Send message to backend and get bot's response
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then(response => response.json())
    .then(data => {
      // Remove the typing indicator
      typingIndicator.remove();
      if (data.reply) {
        appendMessage('bot', data.reply);
      } else if (data.error) {
        appendMessage('bot', `Error: ${data.error}`, 'error-message');
      }
    })
    .catch(error => {
      console.error('Error fetching bot reply:', error);
      appendMessage('bot', 'Sorry, something went wrong while connecting to the bot.');
    });
});

function appendMessage(sender, text, extraClass = '') {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  if (extraClass) {
    msg.classList.add(extraClass);
  }

  // Use marked.parse for bot messages, fallback to textContent
  // Check for extraClass to avoid parsing 'Typing...' or error messages as markdown
  if (sender === 'bot' && typeof marked !== 'undefined') {
    // Sanitize if you expect users to be able to inject HTML via bot responses in some advanced scenarios
    msg.innerHTML = marked.parse(text);
  } else {
    msg.textContent = text; // For user messages or if marked is not loaded
  }
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the message element so it can be removed later
}
