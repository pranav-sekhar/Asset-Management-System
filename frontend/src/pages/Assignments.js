import { useEffect, useState } from "react";
import API from "../api";

function Assignments(){
    const[assignments,setassignments] = useState([])
    const[assetid,setassetid] = useState("")
    const[empid,setempid] = useState("")
    useEffect(()=>{
        const fetchassignment = async() =>{
            const res = await API.get("assignments/")
            setassignments(res.data.results || res.data)
        }
        fetchassignment()
    },[])
    const handleassign = async(e) =>{
        e.preventDefault()
        await API.post("assignments/",{
            employee : empid, asset : assetid
        })
        setempid("");
        setassetid("");
        const res = await API.get("assignments/")
        setassignments(res.data.results || res.data)
    }
    return(
        <div>
            <h2>ASSET ASSIGNMENTS</h2>
            <form onSubmit={handleassign} style={{display:"flex"}}>
                <div style={{marginRight:"10px"}}><label>Employee ID :</label>
                <input placeholder="Enter employee ID" value={empid} onChange={e=>setempid(e.target.value)} required/></div>
                <div style={{marginRight:"10px"}}><label>Asset ID :</label>
                <input placeholder="Enter asset ID" value={assetid} onChange={e=>setassetid(e.target.value)} required/></div>
                <button className="add" type="submit">Assign Asset</button>
            </form>
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
            </table>
        </div>
    )
}
export default Assignments;