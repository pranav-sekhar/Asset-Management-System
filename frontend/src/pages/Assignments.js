import { useEffect, useState } from "react";
import API from "../api";
import {jwtDecode} from "jwt-decode";

function Assignments(){
    const[assignments,setassignments] = useState([])
    const[assetid,setassetid] = useState("")
    const[empid,setempid] = useState("")
    const[assets,setassets] = useState([])
    const [nextpg, setnextpg] = useState(null)
    const [prevpg, setprevpg] = useState(null)
    const fetchassignment = async(url = "assignments/") =>{
            const res = await API.get(url)
            setassignments(res.data.results)
            setprevpg(res.data.previous)
            setnextpg(res.data.next)
    }
    useEffect(()=>{
        fetchassignment()
        const fetchassets = async() =>{
            const res = await API.get("assetsall/")
            setassets(res.data)
        }
        fetchassets()
    },[])
    //define user
    const token = localStorage.getItem("token")
    const user = token ? jwtDecode(token) : null

    const handleassign = async(e) =>{
    e.preventDefault()
    await API.post("assignments/",{
        employee : empid, asset : assetid
    })
    setempid("");
    setassetid("");
    fetchassignment()
    }
    return(
        <div>
            <h2>ASSET ASSIGNMENTS</h2>
            {user?.is_staff &&(
            <form onSubmit={handleassign} style={{display:"flex"}}>
                <div style={{marginRight:"10px"}}><label>Employee ID :</label>
                <input type="number" placeholder="Enter employee ID" value={empid} onChange={e=>setempid(e.target.value)} required/></div>
                <div style={{marginRight:"10px"}}><label>Asset :</label>
                <select value={assetid} onChange={e=>setassetid(e.target.value)} required>
                    <option value="">-- Select Asset --</option>
                    {assets.map(asset=>(
                        <option key={asset.id} value={asset.id}>{asset.name}</option>
                    ))}
                </select></div>                
                <button className="add" type="submit">Assign Asset</button>
            </form>)}
            <table border="1" cellPadding="12">
                <thead>
                <tr>
                    <th>EmpID</th><th>Employee</th><th>Asset</th><th>Assigned Date</th><th>Returned Date</th>
                </tr>
                </thead>
                <tbody>
                    {assignments.map(assign =>(
                        <tr key={assign.id}>
                            <td>{assign.employee}</td>
                            <td>{assign.emp_name}</td>
                            <td>{assign.asset_name}</td>
                            <td>{assign.assigned_date}</td>
                            <td>{assign.returned_date || "Not Returned"}</td>
                        </tr>
                    ))}
                </tbody>
            </table><br/>
            <button className="prev" onClick={()=>fetchassignment(prevpg)} disabled={!prevpg}>Previous</button>
            <button className="nxt" onClick={()=>fetchassignment(nextpg)} disabled={!nextpg}>Next</button>
        </div>
    )
}

export default Assignments;