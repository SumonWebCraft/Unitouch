import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./popup.css";
// import { CheckCircle} from "@material-ui/icons"; 
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function Popup() {
  return (
    
    
    <div className='popup'>
        <div className='popupText'>
        <BsFillCheckCircleFill className='icon'/> 
        <br/>
        Registration Succssfully Completed!!!
        <br/>
        A email verification link sended to your email. 
        <br/>
        Please verify your email address to  login into your account!!!
        </div>
        
        <Link to="/login" >
        <button className="popupButton">
        OK 
        </button>
           </Link>
        </div>
    
    
    
  )
}