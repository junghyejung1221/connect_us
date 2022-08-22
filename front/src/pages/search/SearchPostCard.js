import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from "../../style/search.module.css";

const DEFAULT_POST_IMAGE =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultPostImg.jpeg";

const SearchPostCard = ({ post, bottomRef }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.search_card}
      onClick={() => navigate(`/post/${post.id}`)}
      ref={bottomRef}
    >
      <Card.Img
        variant="top"
        src={post?.previewImageLink || DEFAULT_POST_IMAGE}
        style={{ height: "230px" }}
      />
      <Card.Body>
        <Card.Title
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {post.title}
        </Card.Title>
        <Description> {post.description}</Description>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Infos>
            <p>
              by <span>{post.userName}</span>
            </p>
            <div>
              <div style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faHeart} />
                {` ${post?.likes?.length || 0}`}
              </div>
              <div>
                <FontAwesomeIcon icon={faMessage} />
                {` ${post?.comments?.length || 0}`}
              </div>
            </div>
          </Infos>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SearchPostCard;

const Description = styled.div`
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  > p {
    color: #7b7b7b;
    margin: 0;
    > span {
      color: #000;
      font-weight: bold;
    }
  }
  > div > div {
    display: inline;
  }
`;
