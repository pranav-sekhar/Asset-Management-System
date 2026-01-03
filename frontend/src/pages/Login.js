import { useState } from "react";
import API from "../api";

function Login({onLogin}){
    const[username,setusername] = useState("")
    const[password,setpassword] = useState("")
    const[error,seterror] = useState("")
    
    const handlelogin = async(e) =>{
        e.preventDefault()
    try{
        const res = await API.post("login/",{username,password})
            localStorage.setItem("token",res.data.access)
            seterror("")
            onLogin();
        }catch{
            seterror("Invalid Credentials")
        }

    }

    return(
        <div>
            <h2 className="loginhead">LOGIN</h2>
            {error && <p style={{color:"red"}}>{error}</p>}
            <form onSubmit={handlelogin}>
                <div><label>Username :</label>
                <input placeholder="Enter username" value={username} onChange={e =>setusername(e.target.value)} required/></div><br/><br/>
                <div><label>Password :</label>
                <input type="password" placeholder="Enter password" value={password} onChange={e =>setpassword(e.target.value)} required/></div><br/><br/>
                <button className="login" type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;