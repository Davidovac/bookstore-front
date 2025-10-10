import React from "react";
import { Link, useLocation } from 'react-router-dom';
import '../styles.scss';

const Header = () => {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="nav-bar">
      <Link className={current === "/publishers" ? "hidden" : ""} to="/publishers">Izdavaci</Link>
      <Link className={current === "/authors" ? "hidden" : ""} to="/authors?page=1">Autori</Link>
      <Link className={current === "/books" ? "hidden" : ""} to="/books">Knjige</Link>
      <Link className={current === "/createBook" ? "hidden" : ""} to="/createBook">Dodaj knjigu</Link>
    </div>
  );
};

export default Header;