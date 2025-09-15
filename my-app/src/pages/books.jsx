import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

  const handleEditBook = (editBook) => {
    navigate("/createBook");
  }

  const editBook = async (m) => {
    const newArray = [...sortedFs];
    const preChangedF = newArray[i];
      try {
        setLoading(true);
        const response = await updateBook(m.id, m);
        setError('');
        alert('Uspesno ste izmenili knjigu');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Ne postoji knjiga sa ovim id-em.');
          } else if (error.response.status === 400) {
            setError('Podaci koje ste uneli nisu validni.');
          }
          else if (error.response.status === 500) {
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
    }
  
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
              <Book key={b.id} b={b} onEdit={handleEditBook} onDelete={handleDeleteBook}/>
            ))}
          </tbody>
      </table>
    </div>
  );
}
export default Books;