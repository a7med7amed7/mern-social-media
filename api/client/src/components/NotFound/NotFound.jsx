import Topbar from '../topbar/Topbar'
import './notfound.css'

function NotFound() {
    return (
        <>
            <Topbar />
            <div className='notFound'>
                <div><span>404</span> | Page Not Found</div>
            </div>
        </>
    )
}

export default NotFound