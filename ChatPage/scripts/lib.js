function sendMessage(text) {
    if (text) {
        let message = { text, author: "Sveta" };
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
