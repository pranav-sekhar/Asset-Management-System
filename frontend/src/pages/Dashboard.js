import { useEffect, useState } from "react";
import API from "../api";

function Dashboard(){
    const[assetcount,setassetcount] = useState(0)
    const[assignedcount,setassignedcount] = useState(0)
    const[availablecount,setavailablecount] = useState(0)
    const[opentickets,setopentickets] = useState(0)
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

    return(
        <div>
            <h2>DASHBOARD</h2>
            <div className="dash">
            <p>Total Assets : {assetcount}</p>
            <p>Assigned Assets : {assignedcount}</p>
            <p>Available Assets : {availablecount}</p>
            <p>Open Repair Tickets : {opentickets}</p>
            </div>
        </div>
    )
}
export default Dashboard;