import React, { useEffect, useState } from 'react';

import  Home  from "./pages/Home";
 import Login from './pages/login/Login';
 import Register from './pages/register/Register';
 import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { userAccessToken, fetchUser } from './utils/fetchUser';
import Popup from './pages/popup/Popup';
// import Profile from './pages/profile/Profile';
// import Friendprofile from './pages/profile/Friendprofile';
// import Friendprofile1 from './pages/profile/Friendprofile1';
// import Friendprofile2 from './pages/profile/Friendprofile2';
// import Friendprofile3 from './pages/profile/Friendprofile3';
// import Messenger from './pages/messenger/Messenger';
 
function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate() 

  useEffect(() => {

    const accessToken = userAccessToken();
    if(!accessToken){
      navigate("/login");
    }

    else{
      const [userInfo] = fetchUser();
      setUser(userInfo);
    }

  },[]);
  
  

  return (
    <>
      <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route path="/*" element={<Home user={user} />} />
      {/* <Route path="/home" element={<Home user = {user}/>} />  */}
       <Route path="/popup" element={<Popup/>} />
      {/* <Route path="/profile" element={<Profile/>} />
      <Route path="/friendprofile" element={<Friendprofile/>} />
      <Route path="/friendprofile1" element={<Friendprofile1/>} />
      <Route path="/friendprofile2" element={<Friendprofile2/>} />
      <Route path="/friendprofile3" element={<Friendprofile3/>} />
      <Route path="/messenger" element={<Messenger/>} />  */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    
        
      </Routes>
    </>
  );
}

export default App;