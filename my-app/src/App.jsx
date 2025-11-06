import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserContext from './components/userContext';
import Header from "./components/header";
import Books from "./pages/books";
import Authors from "./pages/authors";
import Publishers from "./pages/publishers";
import CreateBook from "./pages/createBook";
import Login from './components/login';
import Register from './components/register';
import "./styles.scss";
import Profile from './pages/profile';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (err) {
        console.error('Invalid token', err);
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="main-container">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/authors" element={<Authors />}/>
            <Route path="/publishers" element={<Publishers />}/>
            <Route path="/books" element={<Books />}/>
            <Route path="/createBook" element={<CreateBook />}/>
              <Route path="createBook/:id" element={<CreateBook />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
export default App;