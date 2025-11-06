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
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      <Link className={current === "/publishers" ? "hidden" : ""} to="/publishers">Izdavaci</Link>
      <Link className={current === "/authors" ? "hidden" : ""} to="/authors?page=1">Autori</Link>
      <Link className={current === "/books" ? "hidden" : ""} to="/books">Knjige</Link>
      {user && user.role.includes('Librarian') && (
        <>
          <Link className={current === "/createBook" ? "hidden" : ""} to="/createBook">Dodaj knjigu</Link>
        </>
      )}
      {!user && 
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      }

      {user && (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={(e) => handleLogout()}>Odjavi se</button>
        </>
      )}
      
    </nav>
  );
};

export default Header;