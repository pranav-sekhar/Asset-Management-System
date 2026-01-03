import { useEffect, useState } from "react";
import API from "../api";
import {jwtDecode} from "jwt-decode";

function Inventory(){
    const[items,setitems] = useState([])
    const[itemname,setitemname] = useState("")
    const[quantity,setquantity] = useState("")
    const [nextpg, setnextpg] = useState(null)
    const [prevpg, setprevpg] = useState(null)
    const fetchinventory = async(url = "inventory/") =>{
            const res = await API.get(url)
            setitems(res.data.results)
            setprevpg(res.data.previous)
            setnextpg(res.data.next)
    }
    useEffect(()=>{
        fetchinventory()
    },[])
    //define user
    const token = localStorage.getItem("token")
    const user = token ? jwtDecode(token) : null

    const handleinventory = async(e) =>{
        e.preventDefault()
        await API.post("inventory/",{
            item : itemname, quantity : quantity
        })
        setitemname("");
        setquantity("");
        fetchinventory()
    }

    return(
        <div>
            <h2>MANAGE INVENTORIES</h2>
            {user?.is_staff && (
            <form onSubmit={handleinventory} style={{display:"flex"}}>
                <div style={{marginRight:"15px"}}><label>Item Name :</label>
                    <input placeholder="Enter inventory name" value={itemname} onChange={e=>setitemname(e.target.value)} required/></div>
                <div style={{marginRight:"15px"}}><label>Quantity :</label>
                    <input type="number" placeholder="Enter quantity" value={quantity} onChange={e=>setquantity(e.target.value)} required/></div>
                <button className="add" type="submit">Add New Item</button>
            </form>)}
            <table border="1" cellPadding="12">
                <thead>
                    <tr>
                        <th>Item</th><th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item=>(
                        <tr key={item.id}>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                        </tr>                        
                    ))}
                </tbody>
            </table><br/>
            <button className="prev" onClick={()=>fetchinventory(prevpg)} disabled={!prevpg}>Previous</button>
            <button className="nxt" onClick={()=>fetchinventory(nextpg)} disabled={!nextpg}>Next</button>
        </div>
    )
}
export default Inventory;