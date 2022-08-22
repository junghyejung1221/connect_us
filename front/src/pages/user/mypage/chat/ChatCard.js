import styled from "styled-components";

const ChatCard = ({ message, userId }) => {
  const isMyChat = userId === message.user.id;
  return (
    <CardContainer isRight={isMyChat}>
      <ProfileImg src={message.user.imageLink} alt="profile_img" />
      {message.chat && <p>{message.chat}</p>}
      {message.gif && <ChatGif src={message.gif} alt="message_gif" />}
    </CardContainer>
  );
};

export default ChatCard;

const CardContainer = styled.div`
  text-align: ${(props) => (props.isRight ? "right" : "left")};
  display: flex;
  flex-direction: ${(props) => (props.isRight ? "row-reverse" : "row")};
  margin: 20px 10px;
  > p {
    max-width: 350px;
    background: ${(props) => (props.isRight ? "#1A233B" : "#fff")};
    color: ${(props) => (props.isRight ? "#fff" : "#1A233B")};
    padding: 1.5%;
    margin: 0 10px;
    align-self: center;
    border-radius: 6px;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChatGif = styled.img`
  width: 200px;
  height: 250px;
  object-fit: cover;
  margin-right: 20px;
`;
