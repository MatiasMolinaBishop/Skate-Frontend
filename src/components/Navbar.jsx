// src/components/Navbar.js

import { Link } from "react-router-dom";
import { useContext, useState } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT

function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(true)
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);   // <== ADD

  console.log('the user info has:', user)

  

  
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
            <img className='event-creator-img' src='https://images.unsplash.com/photo-1680763652764-c3714cfa872f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' alt='foto' />
            <img className='event-creator-img' src={user.img} alt='foto' />
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
