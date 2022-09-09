import { Link } from 'react-router-dom'
import './sidebarMenu.css'
import { HomeOutlined, PersonOutline, DvrOutlined, SettingsOutlined, PublicOutlined, LiveHelpOutlined } from "@material-ui/icons"
function SidebarMenu() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='SidebarMenu'>
            <ul>
                <li>
                    <Link to='/'>
                        <i className='menuIcon'>
                            <HomeOutlined />
                        </i>
                        <div className="menuItem">Home</div>
                    </Link>
                </li>

                <li>
                    <Link to={`/profile/${user.username}`}>
                        <i className='menuIcon'>
                            <PersonOutline />
                        </i>
                        <div className="menuItem">Profile</div>
                    </Link>
                </li>

                <li>
                    <Link to='/'>
                        <i className='menuIcon'>
                            <DvrOutlined />
                        </i>
                        <div className="menuItem">News Feed</div>
                    </Link>
                </li>

                <li>
                    <Link to={`/profile/${user.username}/update`}>
                        <i className='menuIcon'><SettingsOutlined /></i>
                        <div className="menuItem">Settings</div>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <i className='menuIcon'><PublicOutlined /></i>
                        <div className="menuItem">Discover</div>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <i className='menuIcon'><LiveHelpOutlined /></i>
                        <div className="menuItem">FAQ</div>
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default SidebarMenu