import { useEffect, useState } from "react";
import API from "../api";
import {jwtDecode} from "jwt-decode";

function Dashboard(){
    const[assetcount,setassetcount] = useState(0)
    const[assignedcount,setassignedcount] = useState(0)
    const[availablecount,setavailablecount] = useState(0)
    const[opentickets,setopentickets] = useState(0)
    const[empid,setempid] = useState("")
    const[username,setusername] = useState("")
    const[password,setpassword] = useState("")
    useEffect(()=>{
        const fetchdash = async() =>{
            const res = await API.get("dashboard/")
            setassetcount(res.data.tot_assets) //same fields given in views dashboard analytics
            setassignedcount(res.data.assigned_assets)
            setavailablecount(res.data.available_assets)
            setopentickets(res.data.open_tkts)
        }
        fetchdash()
    },[])
    //define user
    const token = localStorage.getItem("token")
    const user = token ? jwtDecode(token) : null
    //for adding new emp
    const handleemp = async(e)=>{
        e.preventDefault()
        if(!empid || !username || !password) return;
        await API.post("employee/create/",{
            empid, username, password,
        })
        setempid("")
        setusername("")
        setpassword("")
    }

    return(
        <div>
            <h2>DASHBOARD</h2>
            <div className="dash">
            <p>Total Assets : {assetcount}</p>
            <p>Assigned Assets : {assignedcount}</p>
            <p>Available Assets : {availablecount}</p>
            <p>Open Repair Tickets : {opentickets}</p>
            </div>        
                {user?.is_staff && (    
                <div>
                <h2 style={{marginTop:"40px"}}>Add Employee</h2>
                <form onSubmit={handleemp} style={{display:"flex",marginRight:"15px"}}>
                    <div style={{marginRight:"15px"}}><label>Employee ID :</label>
                        <input type="number" placeholder="Enter employee ID" value={empid} onChange={e=>setempid(e.target.value)} required/></div>
                    <div style={{marginRight:"15px"}}><label>Username :</label>
                        <input placeholder="Enter username" value={username} onChange={e=>setusername(e.target.value)} required/></div>
                    <div style={{marginRight:"15px"}}><label>Password :</label>
                        <input type="password" placeholder="Enter password" value={password} onChange={e=>setpassword(e.target.value)} required/></div>
                    <button className="add" type="submit">Add Employee</button>
                </form></div>)} 
        </div>
    )
}
export default Dashboard;