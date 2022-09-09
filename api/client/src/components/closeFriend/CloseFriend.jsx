import { Link } from "react-router-dom";
import "./closeFriend.css";
function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_BASE_URL;

  return (
    <>
      <Link className="sidebarFriendListItem" to={`/profile/${user.username}`}>
        <img
          src={PF + "person/1.jpeg"}
          alt="Profile Pic"
          className="sidebarFriendListItemImg"
        />
        <span className="sidebarFriendListItemText">{user.username}</span>
      </Link>
    </>
  );
}

export default CloseFriend;
