async function onSendClick() {
    let input = document.getElementById('message_fld');
    await sendMessage(input.value);
    input.value = "";
    await reload()
}

async function reload() {
    let messages = await getMessages();
    console.log("Messages: " + JSON.stringify(messages));
    let list = document.getElementById("messages_list");
    list.innerText = "";
    messages.forEach(m => list.appendChild(createListItem(m)));
}

function createListItem({ author, text, time }){
    let timeStr = convertToTime(time);

    let li = document.createElement("li");

    let me = isMe(author);
    if(me) {
        li.classList.add('my');
    }
    else {
        li.classList.add('theirs');
    }

    li.innerHTML =
        `<span class="time">[${timeStr}]</span>` +
        `<b> ${author}</b>: ` +
        `${text}`;
    return li;
}

function isMe(author){
    return window.chat.user === author;
}

function convertToTime(unixTime){
    if(!unixTime){
        return "--:--:--"
    }
    return moment(unixTime).format("HH:mm:ss")
}
