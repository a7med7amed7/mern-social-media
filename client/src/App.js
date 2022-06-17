import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisplayedPost from "./components/displayedPost/DisplayedPost";
import Update from "./pages/Update/Update";
import NotificationsList from "./components/notificationsList/NotificationsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="/post/:id" element={<DisplayedPost />} />
        <Route exact path="/profile/:username/update" element={<Update />} />
      </Routes>
      <NotificationsList />
    </Router>
  );
}

export default App;
