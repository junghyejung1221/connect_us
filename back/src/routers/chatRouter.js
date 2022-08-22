import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { chatService } from "../services/chatService";
import { chatImgUpload } from "../utils/s3";
const chatRouter = Router();

chatRouter.post("/room", login_required, async function (req, res, next) {
  try {
    const users = req.body.users;
    const newRoom = await chatService.createRoom({ users });

    res.status(200).send(newRoom);
  } catch (err) {
    next(err);
  }
});

chatRouter.post("/room/:id/chat", login_required, async (req, res, next) => {
  try {
    const id = req.params.id;
    const chat = req.body.chat;
    const userId = req.body.userId;

    const createdChat = await chatService.createChat({ id, chat, userId });
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", createdChat);
    res.send("ok");
  } catch (err) {
    next(err);
  }
});

chatRouter.post(
  "/room/:id/gif",
  login_required,
  chatImgUpload.single("image"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const gif = req.file.location;
      const userId = req.currentUserId;
      const createdChat = await chatService.createChatWithGif({
        id,
        gif,
        userId,
      });
      req.app.get("io").of("/chat").to(req.params.id).emit("chat", createdChat);
      res.send("ok");
    } catch (err) {
      next(err);
    }
  }
);

chatRouter.get("/room/:id", login_required, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const chats = await chatService.getChatList({ roomId });
    res.status(200).send(chats);
  } catch (err) {
    next(err);
  }
});

chatRouter.get("/rooms/:userId", login_required, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const rooms = await chatService.getRoomList({ userId });
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
});

export { chatRouter };
