import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Edit } from "@material-ui/icons";
function Profile() {
  const PF = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState({});
  const { username } = useParams();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const isFollower = async () => {
      if (currentUser.followings.includes(user._id)) {
        setFollow(true);
        console.log(currentUser.followings, user._id);
        console.log(follow);
      }
    };
    isFollower();
  }, [currentUser.followings, user._id, follow]);
  const followHandler = async (e) => {
    e.preventDefault();
    await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
    currentUser.followings.push(user._id);
    localStorage.setItem("user", JSON.stringify(currentUser));

    setFollow(!follow);
    console.log(currentUser.followings, user);
  };
  const unfollowHandler = async (e) => {
    e.preventDefault();
    await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
    currentUser.followings.filter((u) => {
      return u !== user._id;
    });
    localStorage.setItem("user", JSON.stringify(currentUser));

    setFollow(!follow);
    console.log(follow);
  };
  return (
    <>
      <div className="profileTop">
        <Topbar />
      </div>
      <div className="profile">
        <div className="profileLeft">
          <Sidebar />
        </div>
        <div className="profileCenter">
          <div className="profileCenterTop">
            <div className="profileImages">
              <img
                src={PF + user.coverPicture}
                alt="cover"
                className="ProfileCover"
              />
              <img
                src={PF + user.profilePicture}
                alt="ProfilePicture"
                className="ProfileImg"
              />
            </div>
            <div className="profileData">
              <div className="profileUsername">{user.username}</div>
              <div className="profileDesc">{user.desc}</div>
            </div>
          </div>
          <div className="EditFollow">
            {currentUser.username === username ? (
              <Link
                to={`/profile/${currentUser.username}/update`}
                className="editData"
              >
                Edit
                <Edit />
              </Link>
            ) : (
              <form onSubmit={!follow ? followHandler : unfollowHandler}>
                {!follow ? (
                  <button className="follow">Follow</button>
                ) : (
                  <button className="unfollow">Unfollow</button>
                )}
              </form>
            )}
          </div>
          <div className="profileCenetrBottom">
            <Feed username={username} />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
