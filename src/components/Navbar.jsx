// src/components/Navbar.js

import { Link } from "react-router-dom";
import { useContext, useState } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT

function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(false)
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);   // <== ADD

  

  
  //  Update the rendering logic to display different content 
  //  depending on the user being logged in or not
  return (
    <>
    <button className="sidebar-toggle" onClick={() => setIsNavOpen(!isNavOpen)} >
        <span class="material-symbols-outlined">menu</span>
        <span class="material-symbols-outlined">close</span>
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
                <button className="nav-button">Skate Parks</button>
            </Link>  
          </li>   
          <li className="links">  
            <div className="sidebar-link-flex">
                <span class="material-symbols-outlined">key</span>
                <button onClick={logOutUser} className="nav-button">Logout</button>
            </div>
          </li> 
          <li className="links">
            <div className="sidebar-link-flex">
              <span class="material-symbols-outlined">smart_toy</span>
              <button className="nav-button">{user.name}</button>
            </div>
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
