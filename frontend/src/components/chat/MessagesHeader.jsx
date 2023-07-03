const MessagesHeader = ({ currentChannelName, numberOfMessages }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>{`# ${currentChannelName}`}</b>
    </p>
    <span className="text-muted">
      {`${numberOfMessages} сообщений`}
    </span>
  </div>
);

export default MessagesHeader;
