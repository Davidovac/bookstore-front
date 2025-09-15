import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Book from "../components/book.jsx";
import { getAllBooks, deleteBook, updateBook } from "../services/books.service.jsx";
import "../styles.scss";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data || []);
      setError('');
    } catch (error) {
      setError('Greska pri ucitavanju knjiga.');
    }
    setLoading(false);
  }

  const handleDeleteBook = async (id) => {
    try {
      setLoading(true);
      const response = await deleteBook(id);
      setError('');
      setRefreshKey((prev) => prev + 1);
      alert('Uspesno ste uklonili knjigu');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError('Ne postoji knjiga sa ovim id-em.');
        } else if (error.response.status === 500) {
          setError('Greska na serveru. Pokusajte kasnije.');
        } else {
          setError(`Greska: ${error.response.status}`);
        }
      } else if (error.request) {
        setError('Nema odgovora sa servera.');
      } else {
        setError('Doslo je do greske.');
      }
      console.error('Greska:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadBooks();
  }, [refreshKey]);
  
  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div id="books-container">
      <h3>Prikaz knjiga</h3>
      <table>
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Autor</th>
              <th>Br. stranica</th>
              <th>Datum izdavanja</th>
              <th>ISBN</th>
              <th>Izdavac</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <Book key={b.id} b={b} onEdit={() => navigate("/createBook/" + b.id)} onDelete={handleDeleteBook}/>
            ))}
            <Outlet />
          </tbody>
      </table>
    </div>
  );
}
export default Books;