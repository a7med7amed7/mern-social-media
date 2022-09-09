import "./searchData.css";
import { Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

function SearchData() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const PF = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`/users/search?q=${query}`);
      setUsers(data);
      setLoaded(true);
      console.log(data);
    };

    search();
  }, [query]);
  return (
    <div className="topbarCenter">
      <form className="searchBar">
        <input
          placeholder="Find some friends."
          className="searchInput"
          onChange={(e) => {
            setQuery(e.target.value);
            setLoaded(false);
          }}
        />
        <button className="searchButton">
          <Search className="searchIcon" />
        </button>
      </form>
      <div className="foundData">
        {!loaded ? (
          <CircularProgress />
        ) : (
          users.map((user) => {
            return (
              <Link
                className="sidebarFriendListItem"
                to={`/profile/${user.username}`}
              >
                <img
                  src={PF + "person/1.jpeg"}
                  alt="Profile Pic"
                  className="sidebarFriendListItemImg"
                />
                <span className="sidebarFriendListItemText">
                  {user.username}
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SearchData;
