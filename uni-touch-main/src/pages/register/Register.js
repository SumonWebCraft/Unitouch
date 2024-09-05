import React, { useState, useEffect, useRef  } from 'react'
import app from '../../firebase.init';
import "./register.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, GoogleAuthProvider, ProviderId } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const auth = getAuth(app);
// const provider = createUserWithEmailAndPassword();

export default function Register() {


    // const  saveTokenInLocalStorage = async () => { 

    //      const {user} = await   createUserWithEmailAndPassword( auth);
    //      const { refreshToken , providerData } = user;
    //     localStorage.setItem("user", JSON.stringify(providerData));
    //      localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    //      await setDoc(doc(firebaseDb, 'users', providerData[0].uid),
    //      providerData[0]
         
    //      );
      
    //    };
       
       
      

    const password1 = useRef();
    const cPassword = useRef();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [cPasswordClass, setCPasswordClass] = useState('registerInput');
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmpassword, setCPassword] = useState('')
  const [date, setDate] = useState('')
 

  const [error,  setError ] = useState('')
  const [errorOccured, setErrorOccured] = useState(false)
  const [validated, setValidated] = useState(false);
  const [error1,  setError1 ] = useState('')
  const [error2,  setError2 ] = useState('')
  const [error3,  setError3 ] = useState('')
  const [error4,  setError4 ] = useState('')



  useEffect(() => {
    if (isCPasswordDirty) {
        if (password1.current.value === cPassword.current.value) {
            setShowErrorMessage(false);
            setCPasswordClass('registerInput is-valid')
             
        } 
        else {
            setShowErrorMessage(true)
            setCPasswordClass('registerInput is-invalid')   
        }
    }
}, [isCPasswordDirty])

const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
        if (password1.current.value === cPassword.current.value) {
            setShowErrorMessage(false);
            setCPasswordClass('registerInput is-valid')
                  
        }
         else {
            setShowErrorMessage(true)
            setCPasswordClass('registerInput is-invalid')
             
        }
    }

}

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      
      e.stopPropagation();
      return;
      
    }

    if(!/^[a-z A-Z\-]+$/.test(username)){
        setError1('Invaild username'); 
        return;
        
        
    }
    else{
        setError1('');
        
    }
  
    

    if(!/^[a-z0-9_]+@lus.ac.bd$/.test(email)){
        setError2('Invalid email address'); 
        return;
    }
    else{
        setError2('');
        
    }

    if(!/^(?!\s*$).+/.test(date)){
        setError4('Please insert your date of birth');
      return;

    }
   
else{
    setError4('');
}   


    if(!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)){
        setError3('Password must be at least 8 characters with at least one uppercase, lowercase, digit or special character');
      return;
    }

    else{
      setError3('');    
    }

    if(password1.current.value === cPassword.current.value){
       
       
    }
    else{
       
        return;
    }

    

    
    setValidated(true);
   
    setError1('');
    setError2('');
    setError3('');
    setError4('');
    
    

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
       .then(() => {
       console.log('Verified');
        });
     }

   

      e.preventDefault();  
      console.log('submitted', email, password)
      createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        
        saveTokenInLocalStorage(res.user);
          const user = res.user;
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail();

          navigate('/popup')
      })
      .catch(err => {
          console.error(err)
          setError("This Email Address is Already Registered.")
          setErrorOccured(true)
      })
  }


  



  const handleUsernameBlur = (e) => {
    setUsername(e.target.value)
}

  const handleEmailBlur = (e) => {
      setEmail(e.target.value)
  }

  const handleEPasswordBlur = (e) => {
      setPassword(e.target.value)
      
     
  }

  const handleCPasswordBlur = (e) => {
    setCPassword(e.target.value)
    
     
}

const handleDateBlur = (e) => {
    setDate(e.target.value)
}



 

   








  return (
    
<div className='register'>
            <div className='registerWrapper'>
                <div className='registerLeft'>
                    <h3 className="registerLogo">
                        Unitouch
                    </h3>
                    <span className="registerText"> Welcome To Unitouch</span>
                    <img src='./assets/register.svg' className="registerImg" alt="" />
                </div>

                <div className='registerRight'>


                    <form  noValidate validated={validated} className="registerBox" onSubmit={handleSubmit}>

                        <input onBlur={handleUsernameBlur} type="username" className="registerInput" placeholder="Username"  required />
                        <p className='text-danger'>{error1}</p>

                        <input onBlur={handleEmailBlur} type="email" className="registerInput" placeholder="Email"  required/>
                        <p className='text-danger'>{error2}</p>

                        <input onBlur={handleDateBlur}  type="date"  className="registerInput" />
                        <p className='text-danger'>{error4}</p>

                        

                        <input onBlur={handleEPasswordBlur} type="password" className="registerInput" placeholder="Password" id="password" ref={password1} required/>
                        <p className='text-danger'>{error3}</p>

                        <input onBlur={handleCPasswordBlur} type="password"  placeholder="Confirm Password" className={cPasswordClass} id="confirmPassword" ref={cPassword} onChange={checkPasswords} required/>
        
                        {showErrorMessage && isCPasswordDirty ? <div className='text-danger'> Password and Confirm Password did not match </div> : '' }

                    <br/>

                        
                        <button  type="submit" className="registerButton" > Sign Up  </button>
                        
                        {
                            errorOccured && <p style={{color: 'red'}}>{error}</p>
                        }
                        <br/>

                        <Link className="registerRegisterButton" to="/login"><span className='buttonText'> Sign In </span></Link>

                    </form>

                </div>



            </div>
        </div>


  )
}

export function saveTokenInLocalStorage(refreshToken){
    
   // localStorage.setItem("user", JSON.stringify(providerData));
     localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    

  
  }