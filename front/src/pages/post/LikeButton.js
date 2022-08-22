import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import * as Api from "../../api";

const LikeButton = ({ likes, userId, postId }) => {
  const initialAddLikes =
    likes.findIndex((like) => like.userId === userId) === -1 ? false : true;
  const [addLikes, setAddLikes] = useState(initialAddLikes);
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleClick = async () => {
    if (addLikes) {
      await Api.put("posts/dislike", {
        postId,
      });
      setLikeCount((prev) => prev - 1);
    } else {
      await Api.put("posts/like", {
        postId,
      });
      setLikeCount((prev) => prev + 1);
    }
    setAddLikes((prev) => !prev);
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleClick}>
        {addLikes ? (
          <FontAwesomeIcon
            icon={solidHeart}
            style={{ color: "red", backgroundColor: "transparent" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={regularHeart}
            style={{ backgroundColor: "transparent" }}
          />
        )}
        {` 좋아요 ${likeCount}`}
      </Button>
    </>
  );
};

export default LikeButton;
