import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  PeopleAlt,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Logout from "../logout/Logout";
import jwtDecode from "jwt-decode";
import SearchData from "../searchData/SearchData";
function Topbar() {
  // const PF = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={`/profile/${user.username}`} className="topbarLink">
            Profile
          </Link>
          <div className="alertIcons">
            <div className="notifications">
              {/* <Notifications /> */}
              <span>5</span>
            </div>
            {/* <div className="notifications">
              <Person />
              <span>5</span>
            </div> */}
          </div>
          <Logout />
        </div>
        {/* 
        <div className="topbarIcons">
          <div className="topbarIconsItem">
            <Person />

            <span className="topbarIconsBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Chat />
            <span className="topbarIconsBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Notifications />
            <span className="topbarIconsBadge">1</span>
          </div>
        </div> */}
        {/* <Link to={`/profile`}>
          <img
            src={PF + user.profilePicture}
            alt="Profile Pic"
            className="topbarImg"
          />
        </Link> */}
      </div>
    </div>
  );
}

export default Topbar;
