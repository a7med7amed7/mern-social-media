import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  PeopleAlt,
  ArrowDropDownCircle
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Logout from "../logout/Logout";
import jwtDecode from "jwt-decode";
import SearchData from "../searchData/SearchData";
import DropDown from "../DropDown/DropDown";
function Topbar() {
  const PF = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="search">
        <form>
          <input type="text" placeholder="Find Some Friends" />

          <button><Search /></button>
        </form>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <Link to={`/profile`} className='navProfile'>
            <img
              src={PF + user.profilePicture}
              alt="Profile Pic"
              className="topbarImg"
            />
          </Link>
          <Logout /> */}
          <DropDown />
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
