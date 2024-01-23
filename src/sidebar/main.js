function createMessageReciver(message, chatContainer) {
  const messageReceiver = document.createElement("div");
  messageReceiver.classList.add("message", "receiver");

  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");

  const paragraph = document.createElement("p");
  paragraph.textContent = message;

  messageContent.appendChild(paragraph);
  messageReceiver.appendChild(messageContent);
  chatContainer.appendChild(messageReceiver);
}

function createMessageSender(message, chatContainer) {
  const messageReceiver = document.createElement("div");
  messageReceiver.classList.add("message", "sender");

  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");

  const paragraph = document.createElement("p");
  paragraph.textContent = message;

  messageContent.appendChild(paragraph);
  messageReceiver.appendChild(messageContent);
  chatContainer.appendChild(messageReceiver);
}

function sendMessage() {
  window.alert("Gini: No target language selected.");
  const messageInput = document.getElementById("messageInput");
  const chatContainer = document.querySelector(".chat-container");

  const message = messageInput.value.trim();
  if (message !== "") {
    createMessageReciver(message, chatContainer);
  }
}

const askButton = document.querySelector("button");
askButton?.addEventListener("click", sendMessage);
