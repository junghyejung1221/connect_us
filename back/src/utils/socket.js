const SocketIO = require("socket.io");
//const cookieParser = require("cookie-parser");
const cookie = require("cookie-signature");

module.exports = (server, app) => {
  const io = SocketIO(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
  app.set("io", io);
  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    //console.log("chat 네임스페이스에 접속");
    let rid;
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      //console.log(roomId);
      rid = roomId;
    });
    socket.on("disconnect", () => {
      //console.log("chat 네임스페이스 접속 해제");
      socket.leave(rid);
    });

    socket.on("chat", (data) => {
      socket.to(data.roomId).emit(data);
    });
  });
};
