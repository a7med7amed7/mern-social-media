import { ArrowBack, ArrowDropDownCircle, HomeOutlined, PersonOutline } from '@material-ui/icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './dropDown.css'

function DropDown() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.clear();
        return navigate("/login");
    };
    const [visible, setVisible] = useState(false);
    return (
        <>

            <div>
                <i className='dropIcon' onClick={() => setVisible(!visible)}>
                    <ArrowDropDownCircle />
                </i>
                {visible && (
                    <div className="dropDown">
                        <ul>
                            <Link to="/">
                                <i>
                                    <HomeOutlined />
                                </i>
                                <span>Home</span>
                            </Link>

                            <Link to={`/profile/${user.username}`}>
                                <i>
                                    <PersonOutline />
                                </i>
                                <span>Profile</span>
                            </Link>
                            <a style={{ color: "navy", cursor: "pointer" }} onClick={logoutHandler}>
                                <i>
                                    <ArrowBack />
                                </i>
                                <span>Logout</span>
                            </a>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default DropDown