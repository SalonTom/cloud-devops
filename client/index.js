const path = "https://dxoke3l7j0.execute-api.eu-west-1.amazonaws.com/project/messages";
const channel_id = "unicorn";
const myUsername = "Username";

var msgs = [];

function promptMsg(msgs) {
  var messageDiv = document.getElementById('messages');
  messageDiv.innerHTML = '';
  
  if (msgs && msgs.length > 0) {

    const template = document.querySelector('#message-template');

    msgs.forEach(msg => {

      const clone = template.content.cloneNode(true);
      let textDivs = clone.querySelectorAll("*[id^=\"message-\"]");
  
      for (textDiv of textDivs) {
        const property = textDiv.id.replace('message-', '');

        if (textDiv.id !== 'message-container') {
          textDiv.innerHTML = msg[property];
        } else {
          if (msg.username == myUsername) {
            textDiv.classList.add("my-msg");
            console.log(textDiv.classList)
          }
        }
      };
  
      messageDiv.appendChild(clone);
    });
  } else {

  }
}

function getMessages() {
  axios.get(path).then(response => {
    console.log(response);
    msgs = response.data.map(dbMsg => Msg.dbMessageToMsg(dbMsg));

    const newMsg = JSON.parse(JSON.stringify(msgs[0]));
    
    newMsg.username = "Username"
    newMsg.timestamp = "2022-11-01T00:42:10"
    newMsg.message = "Merci beaucoup !"

    msgs.push(newMsg);

    promptMsg(msgs);
  });
}

getMessages();

const addMsgBtn = document.getElementById('send-button');
const addMsgInput = document.getElementById('msg-input');
addMsgInput.onkeydown = addMsg;

function addMsg(e) {
  if (e.code == "Enter" && addMsgInput.value) {
    msgs.push({
      username: myUsername,
      text: addMsgInput.value,
      sendAt: new Date()
    });

    promptMsg(msgs);
    console.log(msgs);

    addMsgInput.value = null;
  }
}
