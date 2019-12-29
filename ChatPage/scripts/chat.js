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
  let str = chatInput.val();
  let message = parse(str);
  await sendMessage(message);
  clearInput();
  await reload();
}

function clearInput() {
  chatInput.val("");
  chatBtn.prop("disabled", true);
}

async function reload() {
  let messages = await getMessages();
  console.log("Messages: " + JSON.stringify(messages));
  let list = document.getElementById("messages_list");
  list.innerText = "";
  messages.forEach(m => createListItem(m));
}

function createListItem({ author, text, quote, time }) {
  let timeStr = convertToTime(time);

  let li = $("<li>").appendTo(messagesList);

  $("<div>")
    .text(`[${ timeStr }]`)
    .addClass("time")
    .append($("<b>").text(author))
    .appendTo(li);

  if (quote) {
    $("<div>")
      .text(quote)
      .addClass("quote")
      .appendTo(li);
  }
  let textDiv = $("<div>")
    .text(text)
    .appendTo(li);

  if (isMe(author)) {
    li.addClass('my');
  } else {
    li.addClass('theirs');

    $("<a>")
      .addClass("control")
      .text("↲")
      .click(function reply() {
        chatInput.val('"' + text + '" ');
        chatBtn.prop("disabled", true);
      })
      .appendTo(textDiv)
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
  let length = chatInput.val().length;
  chatBtn.prop("disabled", length === 0);
}