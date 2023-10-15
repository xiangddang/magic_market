import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import MessageDataService from "../../services/message.js";
import "./Chat.css";

const Chat = () => {
  const inputRef = useRef(null);
  // Fetch the currently logged-in user from Redux state
  const user = useSelector(selectCurrentUser);
  const [comments, setComments] = useState([]);

  const availableAvatars = [
    "./images/girl_avatar.jpeg",
    "./images/boy_avatar.jpeg",
    "./images/girl2_avatar.jpeg",
    "./images/boy2_avatar.jpeg",
    "./images/girl3_avatar.jpeg",
    "./images/boy3_avatar.jpeg",
    "./images/girl4_avatar.jpeg",
    "./images/boy4_avatar.jpeg",
  ];

  const [usedAvatars, setUsedAvatars] = useState({});

  // Fetch messages from the server and update comments periodically
  useEffect(() => {
    const fetchMessages = async (id) => {
      try {
        const response = await MessageDataService.get(id);
        // Aggregate messages by product and convert to an array
        const aggregatedMessages = response.data.reduce((acc, message) => {
          if (!acc[message.productId]) {
            acc[message.productId] = [];
          }
          acc[message.productId].push(message);
          return acc;
        }, {});
        const arrayResult = Object.entries(aggregatedMessages).map(
          ([productId, messages]) => ({
            productId,
            messages,
          })
        );
        return arrayResult;
      } catch (error) {
        console.log(error);
      }
    };
    // Fetch and update messages every 10 seconds for the logged-in user
    const interval = setInterval(() => {
      if (!user) return;
      fetchMessages(user._id).then((messages) => {
        setComments(messages);
      });
    }, 1000);
    // Clear the interval when the component unmounts or the user changes
    return () => clearInterval(interval);
  }, [user]);

  // Function to leave a comment and update the server
  const leaveComment = (message, position = "seller") => {
    // Get the input value using a ref (assuming you're using useRef)
    const commentInput = inputRef.current;
    if (commentInput) {
      let newComment = {
        productId: message.productId,
        productName: message.messages[0].productName,
        senderId: user._id,
        senderName: `${user.first_name} ${user.last_name}`,
        receiverId:
          position === "seller"
            ? message.messages[0].senderId
            : message.messages[0].receiverId,
        receiverName:
          position === "seller"
            ? message.messages[0].senderName
            : message.messages[0].receiverName,
        messageBody: commentInput.value,
      };
      MessageDataService.createMessage(newComment).catch((e) => {
        console.log(e);
      });
      // Clear the input field after sending
      commentInput.value = "";
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="App">
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="title">Chat</div>
            {comments.map((message) => {
              const toggleExpand = () => {
                setIsExpanded(!isExpanded);
              };

              return (
                <div className="comment-wrapper" key={message.productId}>
                  <p className="talk-about" onClick={toggleExpand}>
                    <span className="triangle">
                      {isExpanded ? "▼  " : "▶  "}
                    </span>
                    We are talking about {message.messages[0].productName}
                  </p>

                  {/* Show comments only if expanded */}
                  {isExpanded && (
                    <div className="comment-container">
                      {/* Map through messages to display comments */}
                      {message.messages.map((comment) => (
                        <div
                          className={`comment ${
                            comment.senderId === user._id ? "right" : "left"
                          }`}
                          key={comment._id}
                        >
                          <div className="sender-info">
                            {/* Display sender's name */}
                            {comment.senderId === user._id && (
                              <span className="sender-name">
                                {comment.senderName}
                              </span>
                            )}
                            {/* Display sender's avatar */}
                            <img
                              src={
                                comment.senderId === user._id
                                  ? user.avatar
                                  : usedAvatars[comment.senderId]
                                  ? usedAvatars[comment.senderId]
                                  : (() => {
                                      const avatarSrc =
                                        availableAvatars[
                                          Math.floor(
                                            Math.random() * availableAvatars.length
                                          )
                                        ];
                                      setUsedAvatars((prevUsedAvatars) => ({
                                        ...prevUsedAvatars,
                                        [comment.senderId]: avatarSrc,
                                      }));
                                      return avatarSrc;
                                    })()
                              }
                              alt="Sender Avatar"
                              className="avatar"
                            />
                            {/* Display sender's name */}
                            {comment.senderId !== user._id && (
                              <span className="sender-name">
                                {comment.senderName}
                              </span>
                            )}
                          </div>
                          {/* Display the message */}
                          <div className="message">{comment.messageBody}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input box for new message */}
                  <div className="input-box">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type your message..."
                      className="message-input"
                    />
                    <Button
                      className="send-button"
                      onClick={() => leaveComment(message)}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
