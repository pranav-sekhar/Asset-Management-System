import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()
    const handlelogout = () =>{
        localStorage.removeItem("token")
        navigate("/login")
    }
    return(
        <div className="navbar">
            <h1 style={{margin:"20px"}}>Smart Asset & Inventory Management System</h1>
            <button style={{margin:"20px",backgroundColor:"lightgrey",cursor:"pointer",padding:"8px",fontWeight:"bold"}} onClick={handlelogout}>Logout</button>
        </div>
    )
}

export default Navbar;