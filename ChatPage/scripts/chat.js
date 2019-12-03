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

function createListItem(m){
    let li = document.createElement("li");
    let author = m.author;
    let text = m.text;
    let time = convertToTime(m.time);
    li.innerHTML =
        `<span class="time">[${time}]</span>` +
        `<b> ${author}</b>: ` +
        `${text}`;
    return li;
}

function convertToTime(unixTime){
    if(!unixTime){
        return "--:--:--"
    }
    return moment(unixTime).format("HH:mm:ss")
}

window.onload = async () => {
    window.chat = {};
    let user = new URL(window.location.href).searchParams.get("user");
    if(user) {
        localStorage.setItem("user", user);
    }else {
        user = localStorage.getItem("user")
    }
    window.chat.user = user ? user : "anonymous";
    await reload();
};