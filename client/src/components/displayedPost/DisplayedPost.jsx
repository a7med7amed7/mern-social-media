import "./displayedPost.css";
import { ExitToAppOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { clicked } from "../../redux/postSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Topbar from "../topbar/Topbar";
import Post from "../post/Post";
import Comment from "../comment/Comment";
function DisplayedPost() {
  const dispatch = useDispatch();
  const [state, setState] = useState("block");
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await axios.get(`/posts/${id}`);
      setPost(fetchedPost.data);
      setLoaded(true);
    };
    fetchPost();
  }, [id]);
  const exitPostHandler = () => {
    dispatch(clicked({ content: "POST" }));
  };
  const [comment, setComment] = useState();
  const postCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const body = {};
      body.userId = post.userId;
      body.postId = post._id;
      body.content = comment;
      const { data } = await axios.post("/posts/comment", body);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(comment);
  }, [comment]);
  return (
    <>
      <Topbar />
      {!loaded ? (
        <div className="loadingPostSpinner">
          <CircularProgress
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          />
        </div>
      ) : (
        <div className="dp">
          <div className="dpWrapper">
            <Post post={post} />
          </div>
          <form className="createComment" onSubmit={postCommentHandler}>
            <textarea
              className="createCommentInput"
              placeholder="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="createCommentButton">Post</button>
          </form>
          <div className="postComments">
            <ul>
              {post.comments.map((c) => {
                return <Comment id={c} uid={post.userId} />;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayedPost;
