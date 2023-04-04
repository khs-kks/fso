const Notifications = ({ msg, successfull }) => {
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

  const failedStyled = {
    color: "red",
    fontStyle: "italic",
    fontSize: "1.5rem",
    backgroundColor: "#E8E8E8",
    borderStyle: "solid",
  };

  if (successfull) {
    return <p style={notificationStyle}>{msg}</p>;
  } else {
    return <p style={failedStyled}>{msg}</p>;
  }
};

export default Notifications;
