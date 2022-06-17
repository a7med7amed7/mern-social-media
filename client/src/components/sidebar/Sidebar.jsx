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

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SearchData />
        <hr className="sidebarHr" />
        <h2 className="closeFriendsTitle">People You May Know </h2>
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
