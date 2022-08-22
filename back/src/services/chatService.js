import { Room, Chat, User } from "../db";
import { v4 as uuidv4 } from "uuid";

class chatService {
  static async createRoom({ users }) {
    const room = await Room.findByUsers({ users });

    if (room) {
      return room;
    }
    const id = uuidv4();
    const newRoom = { id, users };
    const createdNewRoom = await Room.create(newRoom);

    return createdNewRoom;
  }

  static async createChat({ id, chat, userId }) {
    const room = await Room.findById({ id });
    const newChat = {
      roomId: room.id,
      user: userId,
      chat,
    };
    const createdNewChat = await Chat.create({ newChat });
    return createdNewChat;
  }

  static async createChatWithGif({ id, gif, userId }) {
    const room = await Room.findById({ id });
    const user = await User.findById({ userId });
    const newChat = {
      roomId: room.id,
      user: user._id,
      gif,
    };
    const createdNewChat = await Chat.create({ newChat });
    return createdNewChat;
  }

  static async getChatList({ roomId }) {
    const room = await Room.findById({ id: roomId });
    if (!room) {
      const errorMessage =
        "해당 id를 가진 채팅방은 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const chats = await Chat.findByRoomId({ roomId });
    return chats;
  }

  static async getRoomList({ userId }) {
    const rooms = await Room.findByUserId({ userId });
    if (!rooms) {
      const errorMessage =
        "해당 id를 가진 유저가 포함된 채팅방은 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const roomsWithUserData = Promise.all(
      rooms.map(async (room) => {
        const otherId = room.users.find((id) => id !== userId);
        const otherData = await User.findById({ userId: otherId });
        const lastChat = await Chat.findByRoomIdLastOne({ roomId: room.id });
        return {
          id: room.id,
          user: otherData,
          chat: lastChat,
        };
      })
    );
    return roomsWithUserData;
  }
}

export { chatService };
