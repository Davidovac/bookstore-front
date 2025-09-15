import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { createBook, getOneBook, updateBook } from "../services/books.service.jsx";
import BookForm from "../components/bookForm.jsx";
import "../styles.scss";

const CreateBook = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id;

  const handleSubmit = async (book,e) => {
    if (!id) {
      try {
        setLoading(true);
        const response = await createBook(book);
        setError('');
        alert('Uspesno ste kreirali novu knjigu')
        navigate('/books')
      } 
      catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setError('Niste uneli validne podatke.');
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
        
      }
      finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await updateBook(id, book);
        setError('');
        alert('Uspesno ste izmenili knjigu')
        navigate('/books')
      }
      catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setError('Niste uneli validne podatke.');
          } else if (error.response.status === 404) {
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
      }
      finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchAndSetBook = async () => {
        setLoading(true);
        try {
          const data = await getOneBook(id);
          setBook(data);
          setError('');
        } catch (err) {
          setError('Greska pri ucitavanju knjiga.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchAndSetBook();
    }
    else {
      setLoading(false);
    }
  }, [id]);
  
 
  return (
    <div id="createBook-container">
      <h2>Forma za kreiranje/edit knjiga</h2>
      {loading && <div id="loadingSpinner" className="spinner"></div>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BookForm b={book} onSubmit={handleSubmit}/> 
    </div>
  );
}
export default CreateBook;