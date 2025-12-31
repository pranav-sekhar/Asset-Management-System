import { useEffect, useState } from "react";
import API from "../api";

function Inventory(){
    const[items,setitems] = useState([])
    const[itemname,setitemname] = useState("")
    const[quantity,setquantity] = useState("")
    useEffect(()=>{
        const fetchinventory = async() =>{
            const res = await API.get("inventory/")
            setitems(res.data.results)
        }
        fetchinventory()
    },[])

    const handleinventory = async(e) =>{
        e.preventDefault()
        await API.post("inventory/",{
            item : itemname, quantity : quantity
        })
        setitemname("");
        setquantity("");
        const res = await API.get("assignments/")
        setitems(res.data.results || res.data)
    }

    return(
        <div>
            <h2>MANAGE INVENTORIES</h2>
            <form onSubmit={handleinventory} style={{display:"flex"}}>
                <div style={{marginRight:"15px"}}><label>Item Name :</label>
                    <input placeholder="Enter inventory name" value={itemname} onChange={e=>setitemname(e.target.value)} required/></div>
                <div style={{marginRight:"15px"}}><label>Quantity :</label>
                    <input placeholder="Enter quantity" value={quantity} onChange={e=>setquantity(e.target.value)} required/></div>
                <button className="add" type="submit">Add Item</button>
            </form>
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
            </table>
        </div>
    )
}
export default Inventory;