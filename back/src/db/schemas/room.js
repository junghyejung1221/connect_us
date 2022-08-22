import { Schema, model } from "mongoose";

const RoomSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    users: [String],
  },
  {
    timestamps: true,
  }
);

const RoomModel = model("Room", RoomSchema);

export { RoomModel };
