import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase';
import {  useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';


const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);
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
      console.log(user);
       setUser(user);
      dispatch(addUser({uid: uid , email:email , displayName:displayName}));
    navigate("/browse");
      // ...
    } else {
      setUser(null);
      dispatch(removeUser());
      navigate("/");
  
    }
  });
  // unsbscribe the when components unmounts 
  return ()=> unsbscribe();
    },[])

const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView());
}
    
  return (
    <div className=' flex justify-between absolute px-8 py-8 top-0 left-0 w-full bg-gradient-to-b from-black z-30'>
      <div>
      <img
      className='w-44'
      src={LOGO}
      alt='logo'
      />
      </div>
      
       {user && (
        <div className='text-white'>
           <button
            className='p-4 m-2 bg-indigo-500 rounded-lg'
           onClick={handleGptSearchClick}
          >
          {showGptSearch? "Home" :"GPT search"} 
          </button>
          <button
            className='p-4 m-2 bg-red-700 rounded-lg'
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
