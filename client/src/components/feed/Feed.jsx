import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import axios from "axios";
import { useEffect, useState } from "react";

import { CircularProgress } from "@material-ui/core";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  //const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      console.log(res);
      setPosts(res.data);
      setLoaded(true);
    };
    fetchPosts();
    console.log(posts);
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {username ? username === user.username ? <Share /> : "" : <Share />}
        {posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <div className="empty">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
