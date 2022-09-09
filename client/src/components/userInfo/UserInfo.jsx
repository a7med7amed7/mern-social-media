import { Link } from 'react-router-dom'
import './userInfo.css'

function UserInfo() {
    const PF = process.env.REACT_APP_BASE_URL;
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='userInfoContainer'>

            <Link to={`/profile`} className='navProfile'>
                <img
                    src={PF + user.profilePicture}
                    alt="Profile Pic"
                    className="topbarImg"
                />
            </Link>
            <div className="userInfoTitle">
                <div className="userInfoUserName">
                    {user.username}
                </div>
                <div className="userInfoBadge">
                    @super_user
                </div>
            </div>
        </div>
    )
}

export default UserInfo