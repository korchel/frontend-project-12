/* eslint-disable */
const MessagesBox = ({ messages }) => {

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{`${message.username}: ${message.body}`}</b>
        </div>
      ))}
    </div>
  )
}

export default MessagesBox;