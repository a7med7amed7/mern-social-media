import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

function Home() {
  const token = localStorage.getItem("token");
  const res = (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
  return <>{token ? <div>{res}</div> : <a href="/login">Login</a>}</>;
}

export default Home;
