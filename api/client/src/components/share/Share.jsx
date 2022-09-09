import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import store from "../../redux/store";
import { useRef, useState } from "react";
import axios from "axios";
function Share() {
  const userState = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState();
  const desc = useRef();
  const PF = process.env.REACT_APP_BASE_URL;
  const submitPostHandler = async (e) => {
    e.preventDefault();
    console.log(file);
    try {
      const newPost = {
        userId: userState._id,
        desc: desc.current.value,
      };

      if (file) {
        const fileName = Date.now() + file.name;
        const data = new FormData();
        data.append("file", file);
        data.append("name", fileName);
        // newPost.img = fileName;
        console.log(newPost);
        try {
          const fn = await axios.post("/upload", data);
          console.log(fn);
          newPost.img = fn.data;
        } catch (err) {
          console.log(err);
        }
      }
      await axios.post("/posts", newPost);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={PF + userState.profilePicture} alt="" />
          <input
            placeholder={`What's in your mind ${userState.username}?`}
            className="shareInput"
            ref={desc}
          />
          {/* {state.user.user.username && ""} */}
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" encType="multipart/form-data" method="post">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={submitPostHandler}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
