import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
});

const PostSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImageLink: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    previewImageLink: {
      type: String,
      required: false,
      default:
        "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultPostImg.jpeg",
    },
    likes: [LikeSchema],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

export { PostModel };
