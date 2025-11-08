import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from "./userContext";
import '../styles.scss';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="nav-bar">
      <div id='nav-left-block'>
        <Link to="/">Home</Link>
        <Link className={current === "/publishers" ? "hidden" : ""} to="/publishers">Izdavaci</Link>
        <Link className={current === "/authors" ? "hidden" : ""} to="/authors?page=1">Autori</Link>
        <Link className={current === "/books" ? "hidden" : ""} to="/books">Knjige</Link>
        {user && user.role && user.role.includes('Librarian') && (
          <>
            <Link className={current === "/createBook" ? "hidden" : ""} to="/createBook">Dodaj knjigu</Link>
          </>
        )}
      </div>
      
      
      
        <div id='nav-right-block'>
          {user && (
            <>
              <Link to="/profile">👤Profile</Link>
              <Link to="/login" onClick={(e) => handleLogout()}>Odjavi se</Link>
            </>
          )}
          {!user && 
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
          }
        </div>
    </nav>
  );
};

export default Header;