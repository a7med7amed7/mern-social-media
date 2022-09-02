import axios from "axios";
import { useEffect, useState } from "react";
import "./notificationsList.css";

function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  // useEffect(() => {
  //   const getNotifications = async () => {
  //     const { data } = await axios.get(`posts/notifications/${user._id}`);
  //     setNotifications(data);
  //   };
  //   getNotifications();
  //   console.log(notifications);
  // }, [user._id]);
  return (
    <div className="notificationsContainer">
      {notifications.map((n) => {
        return (
          <div className="notification">
            <img src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/280376765_4917399895024989_1949424719120888331_n.jpg?_nc_cat=108&ccb=1-6&_nc_sid=5cd70e&_nc_ohc=aJ5uC2JxFywAX-Dd1ok&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_WfpRtrkyIXJxHnUuV4hri5tP9POYl0qaCILA-wf-LFg&oe=6289823B" />
            <div className="notInfo">{n.user.username} Liked Your Post</div>
          </div>
        );
      })}
      {/* <div className="notification">
        <img src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/280376765_4917399895024989_1949424719120888331_n.jpg?_nc_cat=108&ccb=1-6&_nc_sid=5cd70e&_nc_ohc=aJ5uC2JxFywAX-Dd1ok&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_WfpRtrkyIXJxHnUuV4hri5tP9POYl0qaCILA-wf-LFg&oe=6289823B" />
        <div className="notInfo">Ahmed Hamed Liked Your Post</div>
      </div>{" "}
      <div className="notification">
        <img src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/280376765_4917399895024989_1949424719120888331_n.jpg?_nc_cat=108&ccb=1-6&_nc_sid=5cd70e&_nc_ohc=aJ5uC2JxFywAX-Dd1ok&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_WfpRtrkyIXJxHnUuV4hri5tP9POYl0qaCILA-wf-LFg&oe=6289823B" />
        <div className="notInfo">Ahmed Hamed Liked Your Post</div>
      </div>{" "}
      <div className="notification">
        <img src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/280376765_4917399895024989_1949424719120888331_n.jpg?_nc_cat=108&ccb=1-6&_nc_sid=5cd70e&_nc_ohc=aJ5uC2JxFywAX-Dd1ok&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_WfpRtrkyIXJxHnUuV4hri5tP9POYl0qaCILA-wf-LFg&oe=6289823B" />
        <div className="notInfo">Ahmed Hamed Liked Your Post</div>
    </div>*/}
    </div>
  );
}

export default NotificationsList;
