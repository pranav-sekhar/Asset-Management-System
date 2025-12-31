import { useEffect, useState } from "react";
import API from "../api";

function Tickets(){
    const[tickets,settickets] = useState([])
    const[asset,setasset] = useState("")
    const[descrip,setdescrip] = useState("")
    useEffect(()=>{
        const fetchtkts = async () =>{
            const res = await API.get("repairs/")
            settickets(res.data.results)
        }
        fetchtkts()
    },[])

    const handleraisetkt = async(e) =>{
        e.preventDefault()
        await API.post("repairs/",{
            asset : Number(asset), descrip : descrip
        })
        setasset("");
        setdescrip("");
        const res = await API.get("repairs/")
        settickets(res.data.results || res.data)
    }

    const handlestatus = async(id,newstatus) =>{
        await API.patch(`repairs/${id}/`,{
            status : newstatus
        })
        const res = await API.get("repairs/")
        settickets(res.data.results || res.data)
    }

    return(
        <div>
            <h2>RAISE REPAIR TICKETS</h2>
            <form onSubmit={handleraisetkt} style={{display:"flex"}}>
                <div style={{marginRight:"15px"}}><label>Asset ID :</label>
                    <input placeholder="Enter Asset ID" value={asset} onChange={e=>setasset(e.target.value)} required/></div>                
                <div style={{marginRight:"15px"}}><label>Issue :</label>
                    <input placeholder="Enter Issue description" value={descrip} onChange={e=>setdescrip(e.target.value)} required/></div>
                <button className="add" type="submit">Raise Ticket</button>
            </form>
            <table border="1" cellPadding="12">
                <thead>
                <tr>
                    <th>Asset ID</th><th>Description</th><th>Status</th><th>Created At</th>
                </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket =>(
                        <tr key={ticket.id}>
                            <td>{ticket.asset}</td>
                            <td>{ticket.descrip}</td>
                            <td><select value={ticket.status} onChange={(e)=>handlestatus(ticket.id,e.target.value)}>
                                <option>Reported</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                                </select></td>
                            <td>{ticket.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Tickets;