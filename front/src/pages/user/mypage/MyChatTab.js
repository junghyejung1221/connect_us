import styled from "styled-components";
import * as Api from "api";
import { useEffect, useState } from "react";
import ChatTabCard from "./chat/ChatTabCard";

const MyChatTab = ({ userId }) => {
  const [rooms, setRooms] = useState([]);

  const getRoomList = async () => {
    const rooms = await Api.get(`rooms/${userId}`);
    const filteredRooms = rooms.data.filter((room) => room.chat);
    console.log(filteredRooms);
    setRooms(filteredRooms);
  };

  useEffect(() => {
    getRoomList();
  }, []);
  return (
    <Container>
      {rooms.map((room, idx) => {
        if (idx === rooms.length - 1) {
          return <ChatTabCard room={room} key={room.id} isLast />;
        }
        return <ChatTabCard room={room} key={room.id} />;
      })}
    </Container>
  );
};

export default MyChatTab;

const Container = styled.div`
  width: 100%;
  height: 90%;
  margin-top: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
