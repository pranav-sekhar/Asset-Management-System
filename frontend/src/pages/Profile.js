import {jwtDecode} from "jwt-decode"

function Profile(){
    const token = localStorage.getItem("token")
    const user = jwtDecode(token)

    return(
        <div>
            <h2>PROFILE</h2>
            <div className="profile">
            <p>Username : {user.username}</p>
            <p>User ID : {user.user_id}</p>
            <p>Role : {user.is_staff ? "Admin" : "Employee"}</p>
            </div>
        </div>
    )
}

export default Profile;