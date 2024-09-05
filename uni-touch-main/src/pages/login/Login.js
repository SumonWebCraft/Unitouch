import React from 'react'
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import  { useState  } from 'react';
import app from '../../firebase.init';
import { doc, getFirestore, setDoc } from 'firebase/firestore';


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

 
const firebaseDb = getFirestore(app);
//const navigate = useNavigate();

export default function Login() {
 
const login = async () => { 
 
  const {user} = await signInWithPopup(auth, provider);
  const { refreshToken , providerData } = user;
 
  localStorage.setItem("user", JSON.stringify(providerData));
  localStorage.setItem("accessToken", JSON.stringify(refreshToken));
  

  await setDoc(doc(firebaseDb, 'users', providerData[0].uid),
  providerData[0]
  
  );
navigate("/");
};





 
  const [validated, setValidated] = useState(false);
  const [error1,  setError1 ] = useState('')
  const [error2,  setError2 ] = useState('')
  const [error3,  setError3 ] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,  setError ] = useState('')

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error,  setError ] = useState('')
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   }

//  

//    const handleEmailBlur = (e) => {
//      setEmail(e.target.value)
//      }
//  const handleEPasswordBlur = (e) => {
//      setPassword(e.target.value)
    
//      }
const navigate = useNavigate();


const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    
    e.stopPropagation();
    return;
  }
  

  if(!/^[a-z0-9_]+@lus.ac.bd$/.test(email)){
    setError1('Invalid email address'); 
    return;
}
else{
    setError1('');
    
}

if(!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)){
  setError2('Password must be at least 8 characters with at least one uppercase, lowercase, digit or special character');
return;
}

else{
 
  signInWithEmailAndPassword(auth, email, password)
  .then(res=> {
    // saveTokenInLocalStorage(res.user);
   navigate("/");
   
  })
  .catch((error) => {
   setError('Incorrect email or password');
  });




}


setValidated(true);
   
    setError1('');
    setError2('');
    setError3('');

}

const handlePasswordReset = () => {
  sendPasswordResetEmail(auth,email)
  .then(() => {
    setError3( 'Password reset email sent.');
  
  
  }
  )

}





    const handleEmailBlur = (e) => {
      setEmail(e.target.value)
  }

  const handleEPasswordBlur = (e) => {
      setPassword(e.target.value)
      
     
  }












  return (
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className="loginLogo">
                    Unitouch
                </h3>
                <span className="loginText"> Welcome To Unitouch</span>
                <img src='./assets/log.svg' className="loginImg" alt=""/>
                </div>
                <div className='loginRight'>

            
            <form noValidate validated={validated} className="loginBox" onSubmit={handleSubmit} >

            <input onBlur={handleEmailBlur}  type="email" className="loginInput" placeholder="Email" required/>
            <p className='text-danger'>{error1}</p>
        
    <input  onBlur={handleEPasswordBlur} type="password" className="loginInput" placeholder="Password" required/>
    <p className='text-danger'>{error2} {error}</p>

      <button  onClick={handleSubmit} className="loginButton" type="submit"> Log In </button>  
      
     {/* <button type="submit" className="loginButton">
    <Link className="loginButton" to="/home"> Log In</Link>
    </button>  */}
    
<button onClick={handlePasswordReset} className='forgetButton'>

   Forgot Password?

   <div className='text-danger'>
   {error3}
   </div>
   

</button>
<Link className="loginRegisterButton" to="/register"><span className='buttonText1'>Create a New Account</span> </Link>

<button  onClick={() => login()}> Signin With Google</button>

</form>
             
   </div>


</div>
    </div>
  )

}

// export function saveTokenInLocalStorage(providerData,refreshToken){
  
//   localStorage.setItem("accessToken", JSON.stringify(refreshToken));
  

// }