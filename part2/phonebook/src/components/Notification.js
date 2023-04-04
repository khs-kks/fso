export default Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }

  const notificationStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: "1.5rem",
    backgroundColor: "#E8E8E8",
    borderStyle: "solid",
  };

  return <p style={notificationStyle}>{msg}</p>;
};
