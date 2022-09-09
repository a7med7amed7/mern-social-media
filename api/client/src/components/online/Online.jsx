import "./online.css";
function Online({ user }) {
  const PF = process.env.REACT_APP_BASE_URL;

  return (
    <div>
      <li className="onlineFriend">
        <div className="onlineImg">
          <img
            className="onlineFriendImg"
            src={PF + user.profilePicture}
            alt="Online Friend"
          />
          <div className="onlineSlogan"></div>
        </div>
        <span className="onlineFriendText">{user.username}</span>
      </li>
    </div>
  );
}

export default Online;
