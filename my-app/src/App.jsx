import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header.jsx";
import Books from "./pages/books.jsx";
import Publishers from "./pages/publishers.jsx";
import CreateBook from "./pages/createBook.jsx";
import "./styles.scss";

const App = () => {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/publishers" element={<Publishers />}/>
          <Route path="/books" element={<Books />}/>
          <Route path="/createBook" element={<CreateBook />}/>
            <Route path="createBook/:id" element={<CreateBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;