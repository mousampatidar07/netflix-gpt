import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidation } from '../utils/Validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const [isSignInFrom, setisSignInForm] = useState(true);
  const [errmessage , seterrmessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSignInFrom = ()=>{
setisSignInForm(!isSignInFrom);
  }

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick=()=>{

const message = checkValidation(email.current.value , password.current.value);
seterrmessage(message);

if(message) return ; 
if(!isSignInFrom){

createUserWithEmailAndPassword(
  auth, 
  email.current.value, 
  password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
   
      navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrmessage(errorCode + "-" + errorMessage);
    // ..
  });
}else{

signInWithEmailAndPassword(
   auth, 
  email.current.value, 
  password.current.value
)
   .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
//     updateProfile(user, {
//   displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//    const {uid , email , displayName} = auth.currentUser;
//       dispatch(addUser({uid: uid , email:email , displayName:displayName}));
//   navigate("/browse");
// }).catch((error) => {
//   // An error occurred
//   seterrmessage(error.message)
// });
   const {uid , email , displayName} = auth.currentUser;
      dispatch(addUser({uid: uid , email:email , displayName:displayName}));
    
      navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrmessage(errorCode + "-" + errorMessage);
    // ..
  });
}

  };
  return (
    <div>
      <Header/>
      <div className=' absolute  w-full' >
      <img
        className="h-full w-full"
       src='https://assets.nflxext.com/ffe/siteui/vlv3/ea534f76-b87f-4720-9605-cb29cfd9fefe/web/IN-en-20260810-TRIFECTA-perspective_5a83c581-2878-466b-87a0-19d0bf50f4bc_large.jpg'
      alt='logo'
      />
      </div>
      <form 
      onSubmit={(e)=> e.preventDefault()}
      className=' w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 '>
      <h1 className='font-bold text-xl py-4'>{isSignInFrom? "Sign In" : "Sign Up"} </h1>

    {!isSignInFrom && (<input 
    ref={name}
    type='text' 

        placeholder='Full Name' 
        className='p-4 m-2 w-full bg-gray-700'/>)}

        <input
        ref={email}
        type='text' 
        placeholder='Email address' 
        className='p-4 m-2 w-full bg-gray-700'/>

        <input 
        ref={password}
        type='password'
         placeholder='password' 
         className='p-4 m-2 w-full bg-gray-700'/>

         <p className='text-red-500 font-bold text-lg p-2'>{errmessage}</p>

        <button 
        className='p-4 m-2 bg-red-700 w-full rounded-lg'
        onClick={handleButtonClick}
        >
          {isSignInFrom? "Sign In" : "Sign Up"}
          </button>
        <p className='p-4 cursor-pointer' onClick={toggleSignInFrom}>
          {isSignInFrom? " New to Netflix? Sign Up Now" : "Already registerd? sign in now"}
         </p>
      </form>
    </div>
  )
}

export default Login;

 