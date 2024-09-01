import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Chatlist from "../../Components/chatlist/Chatlist";
import './dashboardLayouts.css'
function DashboardLayout() {
  const {userId,isLoaded}=useAuth()
  const navigate=useNavigate()


  useEffect(()=>{
    if (isLoaded && !userId) {
      navigate('/sign-in')
    }
  },[isLoaded,userId,navigate]);
  if(!isLoaded) return "Loading..."
  return (
    <div className="Dashboardlayout">
      <div className="menu"><Chatlist/></div>
      <div className="content"><Outlet/></div>
    </div>
  );
}

export default DashboardLayout;