import { useEffect, useState, useCallback } from "react";  //callback used to remove useeffect warning thats all
import API from "../api";
import {jwtDecode} from "jwt-decode";

function Assets(){
    const[assets,setassets] = useState([])
    const[nxtpg,setnxtpg] = useState(null)
    const[prevpg,setprevpg] = useState(null) 
    const[name,setname] = useState("")
    const[assettype,setassettype] = useState("")
    const[serialno,setserialno] = useState("")
    const[status,setstatus] = useState("Available")
    const[editid,seteditid] = useState(null)
    const[search,setsearch] = useState("")
    
    //without search feature but with pagination
    /*const fetchassets = async (url = "assets/") =>{  
    const res = await API.get(url)
        setassets(res.data.results)
        setnxtpg(res.data.next)
        setprevpg(res.data.previous)
        }*/
    //with search and pagination together
    const fetchassets = useCallback(async (url) =>{   //with search feature
        if (!url) {
        url = search ? `assets/?search=${search}` : "assets/";
    }
        const res = await API.get(url)
        setassets(res.data.results)
        setnxtpg(res.data.next)
        setprevpg(res.data.previous)
        },[search]) //wo callback jst [] is enough

    useEffect (()=>{
        fetchassets();
    },[fetchassets])  //wo callback jst [] is enough

    //define user
    const token = localStorage.getItem("token")
    const user = token ? jwtDecode(token) : null

    const handlesubmit = async (e) =>{
        e.preventDefault()

    const data = {
        name : name, asset_type : assettype, serial_no : serialno, status : status
    }

    if(editid){
        await API.put(`assets/${editid}/`,data)
    }else{
        await API.post("assets/",data)
    }
    resetform();
    fetchassets();
    }

    const handledelete = async (id) =>{
        await API.delete(`assets/${id}/`)
        fetchassets();
    }

    const handledit = (asset) =>{
        seteditid(asset.id);
        setname(asset.name);
        setassettype(asset.asset_type);
        setserialno(asset.serial_no);
        setstatus(asset.status);
    }

    const resetform = () => {
        setname(""); setassettype(""); setserialno(""); setstatus("Available"); seteditid(null);
    }
    return(
        <div className="assethead">
            <h2>MANAGE ASSETS</h2>
            {user?.is_staff &&(
            <form onSubmit={handlesubmit} style={{display:"flex", padding:"15px"}}>
                <div style={{marginRight:"10px"}}><label>Asset Name :</label>
                <input placeholder="Enter asset name" value={name} onChange={e=>setname(e.target.value)} required/></div>
                <div style={{marginRight:"10px"}}><label>Asset Type :</label>
                <input placeholder="Enter asset type" value={assettype} onChange={e=>setassettype(e.target.value)} required/></div>
                <div style={{marginRight:"10px"}}><label>Serial No :</label>
                <input placeholder="Enter serial no" value={serialno} onChange={e=>setserialno(e.target.value)} required/></div>
                <div style={{marginRight:"10px"}}><label>Status :</label>
                <select value={status} onChange={e=>setstatus(e.target.value)} required>
                    <option>Available</option>
                    <option>Assigned</option>
                    <option>Repair</option>
                </select></div>                
            <button className="add" type="submit">{editid ? "Update Asset" : "Add New Asset"}</button>
            {editid && <button className="cancel" type="button" onClick={resetform}>Cancel</button>}
            </form>)}

            <div className="searchfilter">
            {/*search feature*/}
            <input placeholder="Search assets..." value={search} onChange={e=>setsearch(e.target.value)}/>
            <button className="search" onClick={()=>fetchassets(`assets/?search=${search}`)}>Search</button>
            <select value={status} onChange={e=>{
                setstatus(e.target.value);
                fetchassets(`assets/?status=${e.target.value}`)
            }}>
                    <option value="">All</option>
                    <option value="Available">Available</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Repair">Repair</option>
            </select></div>

            <table border="1" cellPadding="12">
                <thead>
                    <tr>
                        <th>Asset ID</th><th>Name</th><th>Type</th><th>Serial No</th><th>Status</th>{user?.is_staff &&<th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {assets.map(asset =>(
                        <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.name}</td>
                            <td>{asset.asset_type}</td>
                            <td>{asset.serial_no}</td>
                            <td>{asset.status}</td>
                            {user?.is_staff &&(
                            <td className="editdel">
                                <button className="edit" onClick={()=>handledit(asset)}>Edit</button>
                                <button className="delete" onClick={()=>handledelete(asset.id)}>Delete</button>
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table><br/>

            <button className="prev" onClick={()=>fetchassets(prevpg)} disabled={!prevpg}>Previous</button>
            <button className="nxt" onClick={()=>fetchassets(nxtpg)} disabled={!nxtpg}>Next</button>
        </div>
    )
}
export default Assets;