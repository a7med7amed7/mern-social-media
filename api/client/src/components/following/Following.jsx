import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./following.css";

export default function Following() {
  const PF = process.env.REACT_APP_BASE_URL;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [userFollowings, setFollowings] = useState([]);
  useEffect(() => {
    const fetchFollowings = async () => {
      const { data } = await axios.get(`/users/${currentUser._id}/followers`);
      console.log(data);
      setFollowings(data);
      console.log(userFollowings);
    };
    fetchFollowings();
  }, [currentUser._id]);
  return (
    <div className="following">
      <div className="followingWrapper">
        <h4 className="followingTitle">My Followers</h4>
        <div className="followingContainer">
          <div className="followingList">
            {userFollowings.length > 0 ? (


              userFollowings.map((u) => (

                <div className="followingItem">
                  <img
                    src={PF + u.profilePicture}
                    alt="Following"
                    className="followingImg"
                  />
                  <div className="followingText">{u.username}</div>
                </div>
              ))

            ) : <p>
              You dan't have any followers
            </p>}
          </div>
        </div>
      </div>
    </div>
  );
}
