async function onSendClick() {
  let input = document.getElementById('message_fld');
  await sendMessage(input.value);
  input.value = "";
  let btn = document.getElementById('send_btn');
  btn.disabled = true;
  await reload()
}

async function reload() {
  let messages = await getMessages();
  console.log("Messages: " + JSON.stringify(messages));
  let list = document.getElementById("messages_list");
  list.innerText = "";
  messages.forEach(m => {
    let newLi = createListItem(m);
    list.appendChild(newLi)
  });
}

function createListItem({ author, text, time }) {
  let timeStr = convertToTime(time);

  let li = document.createElement("li");

  let me = isMe(author);
  if (me) {
    li.classList.add('my');
  } else {
    li.classList.add('theirs');
  }

  li.innerHTML =
    `<span class="time">[${ timeStr }]</span>` +
    `<b> ${ author }:</b> ` +
    `${ text } `;

  if (!me) {
    let replyBtn = document.createElement("a");
    replyBtn.classList.add('control');
    replyBtn.innerText = '↲';
    replyBtn.addEventListener(
      'click', function reply() {
        let input = document.getElementById('message_fld');
        input.value = '"' + text + '" ';
        let btn = document.getElementById('send_btn');
        btn.disabled = false;
      });
    li.append(replyBtn);
  }
  return li;
}


/*let replyBtn = createElem({
  tag: 'a',
  clazz: 'control',
  content: '↲',
  onClick: () => reply(author, text)
});*/

/*function createElem({ tag, clazz, content, onClick }) {
  let elem = document.createElement(tag);
  elem.classList.add(clazz);
  elem.innerText = content;
  elem.addEventListener('click', onClick);
  return elem;
}*/

function isMe(author) {
  return window.chat.user === author;
}

function convertToTime(unixTime) {
  if (!unixTime) {
    return "--:--:--"
  }
  let time = moment(unixTime);
  return time.format("HH:mm:ss")
}

function onMessageInput() {
  let btn = document.getElementById('send_btn');
  let input = document.getElementById('message_fld');

  let length = input.value.length;
  if (length > 0) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}