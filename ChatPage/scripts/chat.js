async function onSendClick() {
    let input = document.getElementById('message_fld');
    await sendMessage(input.value);
    input.value = "";
    await reload()
}

async function reload() {
    let messages = await getMessages();
    console.log("Messages: " + messages);
    let list = document.getElementById("messages_list");
    list.innerText = "";
    messages.forEach(m => list.appendChild(createListItem(m)));
}

function createListItem(m){
    let li = document.createElement("li");
    li.innerHTML = `[${m.author}]: ${m.text}`
    return li;
}

window.onload = () => reload()