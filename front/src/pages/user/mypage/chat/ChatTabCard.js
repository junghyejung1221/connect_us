import { UserStateContext } from "components/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatModal from "./ChatModal";

const socket = io.connect("http://localhost:5001/chat");
const DEFAULT_PROFILE_IMAGE =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png";

const ChatTabCard = ({ room, isLast }) => {
  console.log(room);
  const { user } = useContext(UserStateContext);
  const [lastMessage, setLastMessage] = useState(room?.chat ?? {});
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    socket.emit("join_room", room.id);
  }, []);

  useEffect(() => {
    socket.on("chat", (data) => {
      if (data.roomId === room.id) {
        setLastMessage(data);
      }
    });
  }, []);

  const handleClick = () => {
    setIsChatModalOpen(true);
  };

  const handleDate = (createdAt) => {
    const today = new Date();
    const curDate = new Date(createdAt);
    if (
      today.getFullYear() === curDate.getFullYear() &&
      today.getMonth() === curDate.getMonth() &&
      today.getDate() === curDate.getDate()
    ) {
      //하루 이전
      return curDate.toLocaleString("ko-kr").slice(12, -3);
    } else {
      //하루 이후
      return `${curDate.getMonth() + 1}월 ${curDate.getDate()}일`;
    }
  };

  console.log(new Date(lastMessage.createdAt));
  return (
    <>
      <Card onClick={handleClick} isLast={isLast}>
        <ProfileImg>
          <img
            src={room.user.imageLink ?? DEFAULT_PROFILE_IMAGE}
            alt="profile_img"
          />
        </ProfileImg>
        <Content>
          <h4>{room.user.name}</h4>
          {lastMessage.chat && <p>{lastMessage.chat}</p>}
          {lastMessage.gif && <p>사진을 보냈습니다.</p>}
        </Content>
        <p>{handleDate(lastMessage.createdAt)}</p>
      </Card>
      {isChatModalOpen && (
        <ChatModal
          setIsChatModalOpen={setIsChatModalOpen}
          roomId={room.id}
          user={user}
        />
      )}
    </>
  );
};

export default ChatTabCard;

const Card = styled.div`
  display: flex;
  > p {
    width: 10%;
  }
  margin-top: 10px;
  margin-bottom: 30px;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #c4c4c4")};
  cursor: pointer;
`;

const ProfileImg = styled.div`
  width: 15%;
  > img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

const Content = styled.div`
  width: 75%;
  align-self: center;
  > h4 {
    font-size: 20px;
  }
  > p {
    color: #7b7b7b;
    margin-bottom: 0;
  }
`;
