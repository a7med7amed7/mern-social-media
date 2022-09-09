import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import Following from "../following/Following";
import SearchData from "../searchData/SearchData";
function Rightbar({ profile }) {
  const PF = process.env.REACT_APP_BASE_URL;

  const ProfileDisplay = () => <Following />;
  const HomeDisplay = () => (
    <>
      <ul className="onlineFriendsList">
        <h4 className="onlineFriendsTitle">Online Friends</h4>

        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
      <SearchData />
    </>
  );
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">

        {profile ? <ProfileDisplay /> : <HomeDisplay />}
      </div>

    </div>
  );
}

export default Rightbar;
