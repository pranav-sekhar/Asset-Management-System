import {Link} from 'react-router-dom'

function Sidebar(){
    return(
        <div className='sidebar'>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/assets">Assets</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
                <li><Link to="/assignments">Assignments</Link></li>
                <li><Link to="/tickets">Tickets</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;