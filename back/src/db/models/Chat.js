import { ChatModel } from "../schemas/chat";

class Chat {
  static async create({ newChat }) {
    const createdNewChat = await ChatModel.create(newChat);
    return createdNewChat.populate("user");
  }

  static async findByRoomId({ roomId }) {
    const chats = await ChatModel.find({ roomId })
      .sort({ createdAt: 1 })
      .populate("user")
      .lean();
    return chats;
  }

  static async findByRoomIdLastOne({ roomId }) {
    const chats = await ChatModel.find({ roomId }).sort({ createdAt: -1 });
    return chats[0];
  }
}

export { Chat };
