import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Book from "../components/book.jsx";
import { getAllBooks, deleteBook } from "../services/books.service";
import { getAllNames } from "../services/authors.service";
import UserContext from "../components/userContext";
import "../styles.scss";

const Books = () => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([])
  const [sort, setSort] = useState(0);
  const [filters, setFilters] = useState({
    title: '',
    fromPublished: '',
    toPublished: '',
    authorId: '',
    authorName: '',
    fromBirthDate: '',
    toBirthDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  function convertAllDates(data) {
    const newData = {
      ...data,
      fromPublished: data.fromPublished
        ? new Date(data.fromPublished).toISOString()
        : null,
      toPublished: data.toPublished
        ? new Date(data.toPublished).toISOString()
        : null,
      fromBirthDate: data.fromBirthDate
        ? new Date(data.fromBirthDate).toISOString()
        : null,
      toBirthDate: data.toBirthDate
        ? new Date(data.toBirthDate).toISOString()
        : null,
    };

    return newData;
  }

  const loadBooks = async () => {
    try {
      setLoading(true);
      const books = await getAllBooks(sort, convertAllDates(filters));
      const authorNames = await getAllNames();
      setBooks(books || []);
      setAuthors(authorNames || []);
      setError('');
    } catch (error) {
      setError('Greska pri ucitavanju knjiga.');
    }
    setLoading(false);
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <div className="sort-container">
        <select value={sort} onChange={e => setSort(Number(e.target.value))} name="sortSelect">
          <option value="0">Naslov Rastuce</option>
          <option value="1">Naslov Opadajuce</option>
          <option value="2">Datum Rastuce</option>
          <option value="3">Datum Opadajuce</option>
          <option value="4">Autor Rastuce</option>
          <option value="5">Autor Opadajuce</option>
        </select>
        <div className="filter-block">
          <label>Naslov:</label>
          <input type="text" name="title" value={filters.title} onChange={handleFilterChange} />
          <label>Objavljena od:</label>
          <input type="date" name="fromPublished" value={filters.fromPublished} onChange={handleFilterChange} />
          <label>Objavljena do:</label>
          <input type="date" name="toPublished" value={filters.toPublished} onChange={handleFilterChange} />
          <select name="authorId" value={filters.authorId} onChange={handleFilterChange} >
            <option value="">--Svi--</option>
            {authors.map(a => (
              <option key={a.id} value={a.id}>{a.fullName}</option>
            ))}
          </select>
          <label>Ime Autora:</label>
          <input type="text" name="authorName" value={filters.authorName} onChange={handleFilterChange} />
          <label>Autorov datum rodjenja od:</label>
          <input type="date" name="fromBirthDate" value={filters.fromBirthDate} onChange={handleFilterChange} />
          <label>Autorov datum rodjenja do:</label>
          <input type="date" name="toBirthDate" value={filters.toBirthDate} onChange={handleFilterChange} />
        </div>
        <button type="button" onClick={loadBooks}>Filtriraj</button>
      </div>
      <table>
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Autor</th>
              <th>Postoji vec:</th>
              <th>ISBN</th>
              <th>Izdavac</th>
              <th className={user && user.role.includes('Editor') ? "" : "hidden"}>Edit</th>
              <th className={user && user.role.includes('Editor') ? "" : "hidden"}>Delete</th>
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