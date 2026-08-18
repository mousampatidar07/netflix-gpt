import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import {  useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { LOGO } from '../utils/constants';


const Header = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      navigate("/");
  // Sign-out successful.
}).catch((error) => {
 
});
  }

    useEffect(()=>{
        const unsbscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const {uid , email , displayName} = user;
      dispatch(addUser({uid: uid , email:email , displayName:displayName}));
    navigate("/browse");
      // ...
    } else {
      dispatch(removeUser());
      navigate("/");
  
    }
  });
  // unsbscribe the when components unmounts 
  return ()=> unsbscribe();
    },[])

  return (
    <div className=' flex justify-between absolute px-8 py-8 top-0 left-0 w-full bg-gradient-to-b from-black z-30'>
      <div>
      <img
      className='w-44'
      src={LOGO}
      alt='logo'
      />
      </div>
      <div className='text-white'>
        <button className='p-4 m-2 bg-red-700 w-full rounded-lg ' onClick={handleSignOut}>sign out</button>
      </div>
    </div>
  )
}

export default Header
