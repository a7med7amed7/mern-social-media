import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchData from "../searchData/SearchData";
import UserInfo from "../userInfo/UserInfo";
import SidebarMenu from "../sideBarMenu/SidebarMenu";
function Sidebar() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const randomUsers = await axios.get("/users/random-users");
      setUsers(randomUsers.data);
      console.log(randomUsers);
    };
    getUsers();
  }, []);
  const PF = process.env.REACT_APP_BASE_URL;

  return (
    <div className="sidebar">
      {/* <div className="sidebarWrapper">
        <SearchData />
        <hr className="sidebarHr" />
        <h2 className="closeFriendsTitle">People You May Know </h2>
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div> */}
      <UserInfo />
      <SidebarMenu />
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
    </div>
  );
}

export default Sidebar;
