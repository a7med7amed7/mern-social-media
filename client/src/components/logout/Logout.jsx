import "./logout.css";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    return navigate("/login");
  };
  return (
    <div>
      <div onClick={logoutHandler} className="logout">
        Logout
      </div>
    </div>
  );
}

export default Logout;
