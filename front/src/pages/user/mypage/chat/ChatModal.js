import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import * as Api from "api";
import styled, { css } from "styled-components";
import ChatCard from "./ChatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const socket = io.connect("http://localhost:5001/chat");

const ChatModal = ({ setIsChatModalOpen, roomId, user }) => {
  const messageEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [totalMessage, setTotalMessage] = useState([]);

  const getExistedMessage = async () => {
    const chatList = await Api.get(`room/${roomId}`);
    setTotalMessage(chatList.data);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("join_room", roomId);
    getExistedMessage();
  }, []);

  useEffect(() => {
    socket.on("chat", (data) => {
      setTotalMessage((cur) => [...cur, data]);
    });
  }, []);

  const handleClick = async () => {
    await Api.post(`room/${roomId}/chat`, {
      chat: message,
      userId: user._id,
    });
    scrollToBottom();
    setMessage("");
  };

  const handleSendGif = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);
    try {
      await Api.postImage(`room/${roomId}/gif`, formData);
      scrollToBottom();
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <Container>
      <Section>
        <CloseButton onClick={() => setIsChatModalOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
        <Content
          isScroll={totalMessage.length > 9}
          isNotScroll={totalMessage.length <= 9}
        >
          {totalMessage.map((msg, idx) => (
            <ChatCard key={idx} message={msg} userId={user.id} />
          ))}
        </Content>
        <MessageInput>
          <label htmlFor="add_gif">
            <div>
              <FontAwesomeIcon icon={faPaperclip} />
            </div>
          </label>
          <input
            type="file"
            id="add_gif"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleSendGif}
          />
          {/* <button>
            <FontAwesomeIcon icon={faPaperclip} />
          </button> */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faPaperPlane} />
            {` send`}
          </button>
        </MessageInput>
        <div ref={messageEndRef} />
      </Section>
    </Container>
  );
};

export default ChatModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(100, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;

const Section = styled.div`
  position: relative;
  width: 800px;
  height: 700px;
  background-color: #f3f6fb;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  ${(props) =>
    props.isScroll &&
    css`
      max-height: auto;
    `}
  ${(props) =>
    props.isNotScroll &&
    css`
      min-height: 610px;
    `}
`;

const MessageInput = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 1% 0;
  background: #fff;
  > input {
    width: 75%;
    border: none;
    height: 50px;
  }
  > input:focus {
    outline: none;
  }
  > label {
    width: 10%;
    margin-right: 1%;
    text-align: center;
    div {
      border-right: 1px solid #c4c4c4;
      cursor: pointer;
    }
  }
  > button {
    border: none;
    width: 13%;
    background: #ff758e;
    border-radius: 5px;
    padding: 1% 0;
    color: #fff;
    margin-right: 1%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #feb8b8;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;
