import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import Following from "../following/Following";
function Rightbar({ profile }) {
  const PF = process.env.REACT_APP_BASE_URL;

  const ProfileDisplay = () => <Following />;
  const HomeDisplay = () => (
    <ul className="onlineFriendsList">
      <h4 className="onlineFriendsTitle">Online Friends</h4>

      {Users.map((u) => (
        <Online key={u.id} user={u} />
      ))}
    </ul>
  );
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthday">
          <img className="birthdayImg" src={PF + "gift.png"} alt="Birthday" />
          <span className="birthdayText">
            <b>Mohamed Ahmed</b> and <b>3 other</b> have their birthday today.
            Wish them a good day.
          </span>
        </div>
        <div className="ad">
          <img src={PF + "meme.jpg"} alt="Birthday" />
        </div>
        {profile ? <ProfileDisplay /> : <HomeDisplay />}
      </div>
    </div>
  );
}

export default Rightbar;
