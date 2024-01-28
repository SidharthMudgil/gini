window.addEventListener("message", (event) => {
  const message = event.data;
  switch (message.type) {
    case 'gini-result': {
      const chatContainer = document.querySelector(".chat-container");
      createMessageSender(message.value, chatContainer);
      break;
    }
  }
});

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

  tsvscode.postMessage({
    type: "onAsk",
    value: message
  });
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
  const messageInput = document.getElementById("messageInput");
  const chatContainer = document.querySelector(".chat-container");

  const message = messageInput.value.trim();
  if (message !== "") {
    createMessageReciver(message, chatContainer);
  }
  messageInput.value = '';
}

const askButton = document.querySelector("button");
askButton?.addEventListener("click", sendMessage);
