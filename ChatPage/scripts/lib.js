function sendMessage({ text, quote }) {
  if (text || quote) {
    let message = {
      text: text || "",
      quote: quote,
      author: chat.user
    };
    return fetch("http://localhost:8888/chat/send/json", {
        method: 'POST',
        body: JSON.stringify(message)
      }
    )
      .catch(err => {
        console.log(err)
      });
  }
  return Promise.resolve();
}

function getMessages(text) {
  return fetch("http://localhost:8888/chat/messages")
    .then(response => response.json())
    .catch(err => {
      console.log(err)
    });
}

$( document ).ready(function() {
  window.chatInput = $('#message_fld');
  window.chatBtn = $('#send_btn');
  window.messagesList = $('#messages_list');
});

window.onload = async () => {
  window.chat = {};

  let user = new URL(window.location.href).searchParams.get("user");
  if (user) {
    localStorage.setItem("user", user);
  } else {
    user = localStorage.getItem("user")
  }
  window.chat.user = user ? user : "anonymous";
  await reload();
};