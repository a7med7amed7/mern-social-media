import { CircularProgress } from "@material-ui/core";
import { PermMedia } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import "./update.css";

function Update() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = useRef();
  const email = useRef();
  const desc = useRef();
  const password = useRef();
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const updateDataHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${user._id}`, {
        username: username.current.value,
        email: email.current.value,
        desc: desc.current.value,
        password: password.current.value,
        userId: user._id,
      });
      console.log(user._id);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="updateContainer">
      <Topbar />
      <form className="updateForm" onSubmit={updateDataHandler}>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          ref={username}
          maxLength="20"
          minLength="6"
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          ref={email}
          maxLength="50"
        />
        <input
          type="text"
          placeholder="Description"
          value={user.desc}
          ref={desc}
          maxLength="50"
        />

        <input
          type="text"
          placeholder="Password"
          ref={password}
          minLength="6"
        />
        <div className="shareOptions" style={{ margin: "8px 9px" }}>
          <label htmlFor="file" className="shareOption">
            <PermMedia htmlColor="tomato" className="shareIcon" />
            <span className="shareOptionText">Profile Picture</span>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              // onChange={(e) => setFile(e.target.files[0])}
              name="file"
            />
          </label>
        </div>
        <button>
          {clicked ? loaded ? "Update" : <CircularProgress /> : "Update"}
        </button>
      </form>
    </div>
  );
}

export default Update;
