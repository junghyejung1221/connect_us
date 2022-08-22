import { RoomModel } from "../schemas/room";

class Room {
  static async create(newRoom) {
    const createdNewRoom = await RoomModel.create(newRoom);
    return createdNewRoom;
  }

  static async findById({ id }) {
    const room = await RoomModel.findOne({ id });
    return room;
  }

  static async findByUsers({ users }) {
    const room = await RoomModel.findOne({ users: { $all: users } });
    return room;
  }

  static async findByUserId({ userId }) {
    const room = await RoomModel.find({ users: { $all: userId } });
    return room;
  }
}

export { Room };
