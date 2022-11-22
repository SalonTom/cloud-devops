const path = "https://dxoke3l7j0.execute-api.eu-west-1.amazonaws.com/project/messages";
const channel_id = "unicorn";
const myUsername = "admin";

let lastEvaluatedKey = {
  channel_id: {S: ''},
  timestamp_utc_iso8601: {S: ''}
};

let msgs = [];

function promptMsg(msgs, showOldMessges) {
  var messageDiv = document.getElementById('messages');
  if (!showOldMessges) {
    messageDiv.innerHTML = '';
  }
  
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
          }
        }
      };
  
      messageDiv.prepend(clone);
    });
  }
}

async function addMsg(e) {
  if (e.code == "Enter" && addMsgInput.value) {
    const newMsg = new Msg(channel_id, addMsgInput.value, moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'), myUsername, 0);
    await postMessagesAsync(newMsg);

    promptMsg(msgs, false);

    addMsgInput.value = null;
  }
}

async function getMessagesAsync(showOldMessages) {
  const apiResponse = await axios.get(path, {params: {channel: lastEvaluatedKey.channel_id['S'], timestamp: lastEvaluatedKey.timestamp_utc_iso8601['S']}});
  const dbMessages = apiResponse.data.Items;

  if (apiResponse.data.LastEvaluatedKey) {
    lastEvaluatedKey = apiResponse.data.LastEvaluatedKey;
  } else {
    document.getElementById('see-more').style.display = 'none';
  }

  if (dbMessages.length > 0) {
    msgs = dbMessages.map(dbMsg => Msg.dbMessageToMsg(dbMsg));
    promptMsg(msgs, showOldMessages);
  }

  return msgs;
}

async function postMessagesAsync(newMsg) {
  const newMessage = (await axios.post(
    path,
    {
      data: newMsg
    }
  )).data;

  console.log(newMessage);
  msgs.unshift(newMessage);

  promptMsg(msgs, false);
}


const addMsgBtn = document.getElementById('send-button');
const addMsgInput = document.getElementById('msg-input');

getMessagesAsync(false);

addMsgInput.onkeydown = addMsg;
