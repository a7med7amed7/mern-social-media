import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { FavoriteBorderOutlined, Favorite } from "@material-ui/icons";
function Post({ post }) {
  const PF = process.env.REACT_APP_BASE_URL;

  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [imgDisplay, setImgDisplay] = useState("none");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const img = new Image();
  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  const likeHandler = async () => {
    try {
      await axios.put(`posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
    try {
      await axios.put(`/posts/action/${user._id}`, {
        userId: currentUser._id,
        type: "like",
        postId: post._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
      img.onload = () => {};
    };
    fetchUser();
  }, [post.userId]);
  const imageHandler = () => {
    setImgDisplay("flex");
    setLoading(false);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          {loading ? <CircularProgress /> : ""}
          <div className="postTopLeft" style={{ display: imgDisplay }}>
            <Link
              to={"/profile/" + user.username}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "black",
              }}
            >
              <div className="tempImage">
                <img
                  className="postProfileImg"
                  src={PF + user.profilePicture}
                  alt=""
                  onLoad={imageHandler}
                  style={{ display: imgDisplay }}
                />
              </div>

              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{post.createdAt}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="PostImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div className="likeIcon" onClick={likeHandler}>
              {isLike ? (
                <Favorite style={{ color: "red", fontSize: "2em" }} />
              ) : (
                <FavoriteBorderOutlined
                  style={{ color: "gray", fontSize: "2em" }}
                />
              )}
            </div>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <Link className="postCommentText" to={`/post/${post._id}`}>
              {" "}
              comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
