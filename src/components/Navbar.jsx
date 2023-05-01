// src/components/Navbar.js

import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useCallback } from "react";                  
import { AuthContext } from "../context/auth.context";  
import axios from "axios";

function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(true)
    const [profile, setProfile] = useState({})
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);   // <== ADD
  const storedToken = localStorage.getItem("authToken");

  //console.log('the user info has:', user)

  const fetchProfile = useCallback(async () => {

    try {
        const response = await axios.get(`https://we-love-boards.herokuapp.com/api/profile`, { headers: { Authorization: `Bearer ${storedToken}` } })
        // console.log(response)
        setProfile(response.data)
        // console.log(profile)

    } catch (err) {
        console.log(err)
    }
}, [storedToken])

useEffect(() => {
    fetchProfile()
}, [isNavOpen, fetchProfile])
  //  Update the rendering logic to display different content 
  //  depending on the user being logged in or not
  return (
    <>
    <button className="sidebar-toggle" onClick={() => setIsNavOpen(!isNavOpen)} >
      {!isNavOpen ?  <span class="material-symbols-outlined">menu</span>: <span class="material-symbols-outlined">close</span>}
        {/* <span class="material-symbols-outlined">menu</span>
        <span class="material-symbols-outlined">close</span> */}
    </button>
    <nav className={`nav ${isNavOpen ? 'nav-open':'nav-closed'}`}>

        <div className="logo">
            <h1>WE LOVE BOARDS</h1>
            
        </div>
        <ul>
            <li className="links">
                <Link onClick={() => setIsNavOpen(!isNavOpen)} to="/" className="sidebar-link-flex">
                    <span class="material-symbols-outlined">home</span>
                    <button className="nav-button">Home</button>
                </Link>
            </li>
     
      {isLoggedIn && (
        <>
           <li className="links">
            <Link onClick={() => setIsNavOpen(!isNavOpen)} to="/locations" className="sidebar-link-flex">
            <span class="material-symbols-outlined">skateboarding</span>
                <button className="nav-button">Locations</button>
            </Link>  
          </li>   
          <li className="links">  
            <div className="sidebar-link-flex">
                <span class="material-symbols-outlined">key</span>
                <button onClick={logOutUser} className="nav-button">Logout</button>
            </div>
          </li> 
          <li className="links">
          <Link onClick={() => setIsNavOpen(!isNavOpen)} to="/profile" className="sidebar-link-flex">
            {/* <div className="sidebar-link-flex"> */}
              <span class="material-symbols-outlined">smart_toy</span>
              <button className="nav-button">{user.name}</button>
            {/* </div> */}
            </Link> 
          </li>
          <li className="links">  
            <img className='event-creator-img' src={profile.img} alt='foto' />
          </li>
        </>
        
      )}

      {!isLoggedIn && (
        <>
           <li className="links">
            <Link onClick={() => setIsNavOpen(!isNavOpen)} to="/signup" className="sidebar-link-flex"> 
                <span class="material-symbols-outlined">settings_accessibility</span>
                <button className="nav-button">Sign Up</button>
            </Link>
          </li>
          <li className="links">
            <Link onClick={() => setIsNavOpen(!isNavOpen)} to="/login" className="sidebar-link-flex">
                <span class="material-symbols-outlined">key</span>
                <button className="nav-button">Login</button>
            </Link>
          </li>
        </>
      )}
      </ul>
    </nav>
    </>
  );
}

export default Navbar;
