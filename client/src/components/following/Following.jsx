import axios from "axios";
import { useEffect } from "react";
import "./following.css";

export default function Following() {
  const PF = process.env.REACT_APP_BASE_URL;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchFollowings = async () => {
      const { data } = await axios.get(`users/${currentUser._id}/followings`);
      console.log(data);
    };
    fetchFollowings();
  }, [currentUser._id]);
  return (
    <div className="following">
      <div className="followingWrapper">
        <h4 className="followingTitle">My Followings</h4>
        <div className="followingContainer">
          <div className="followingList">
            {currentUser.followings.map((u) => {})}
            <div className="followingItem">
              <img
                src={PF + "person/1.jpeg"}
                alt="Following"
                className="followingImg"
              />
              <div className="followingText">Ahmed Hamed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
