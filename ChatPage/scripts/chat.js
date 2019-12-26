function parse(str) {
  if (str.startsWith('"')) {
    let text = str.substr(1);
    let index = text.indexOf('"');
    if (index !== -1) {
      let quote = text.substr(0, index);
      text = text.substr(index + 1);
      return {
        "quote": quote,
        "text": text
      }
    }
  }

  return { text: str }
}


async function onSendClick() {
  let str = chatInput.value;
  let message = parse(str);
  await sendMessage(message);
  clearInput();
  await reload();
}

function clearInput() {
  chatInput.value = "";
  chatBtn.disabled = true;
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

function createListItem({ author, text, quote, time }) {
  let timeStr = convertToTime(time);

  let li = document.createElement("li");

  let me = isMe(author);

  li.innerHTML = `<span class="time">[${ timeStr }]</span>`;
  li.innerHTML += `<b> ${ author }:</b> `;
  if (quote) {
    li.innerHTML += `<br><i class="quote">${ quote } </i>`;
  }
  li.innerHTML += `<br>${ text } `;

  if (me) {
    li.classList.add('my');
  } else {
    li.classList.add('theirs');
    let replyBtn = document.createElement("a");
    replyBtn.classList.add('control');
    replyBtn.innerText = '↲';
    replyBtn.addEventListener(
      'click', function reply() {
        chatInput.value = '"' + text + '" ';
        chatBtn.disabled = false;
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
  let length = chatInput.value.length;
  if (length > 0) {
    chatBtn.disabled = false;
  } else {
    chatBtn.disabled = true;
  }
}