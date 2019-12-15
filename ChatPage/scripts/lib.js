function sendMessage(messageText) {
    if (messageText) {
        let message = {
            text: messageText,
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


window.onload = async () => {
    window.chat = {};
    let user = new URL(window.location.href).searchParams.get("user");
    if(user) {
        localStorage.setItem("user", user);
    } else {
        user = localStorage.getItem("user")
    }
    window.chat.user = user ? user : "anonymous";
    await reload();
};