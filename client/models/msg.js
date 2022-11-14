class Msg {
  constructor(channel_id, message, timestamp, username, likes) {
    this.channel_id = channel_id;
    this.likes = likes;
    this.message = message;
    this.timestamp = timestamp;
    this.username = username;
  }

  static dbMessageToMsg(dbItem) {
    return new Msg(dbItem.channel_id['S'], dbItem.message['S'], dbItem.timestamp_utc_iso8601['S'], dbItem.username['S'], dbItem.likes['N'])
  }
}