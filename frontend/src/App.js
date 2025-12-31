import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Inventory from "./pages/Inventory";
import Assignments from "./pages/Assignments";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import './App.css'

function Layout(){
  return(
    <>
      <Navbar/>
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{padding:"30px",marginLeft:"40px"}}>
          <Outlet/>
        </div>
        </div>
    </>
  )
}

function App() {  
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login onLogin={()=>window.location.href = "/dashboard"}/>}/>
            <Route element={
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>}>          
                      <Route path="dashboard" element={<Dashboard/>}/>
                      <Route path="assets" element={<Assets/>}/>
                      <Route path="inventory" element={<Inventory/>}/>
                      <Route path="assignments" element={<Assignments/>}/>
                      <Route path="tickets" element={<Tickets/>}/>
                      <Route path="profile" element={<Profile/>}/>
                    </Route>
                  </Routes>
                </BrowserRouter>
    )
}

export default App;
