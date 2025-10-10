import React, { useState, useEffect } from "react";
import "../styles.scss";
import { getAllAuthorsPaged } from "../services/authors.service.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Authors = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const [authors, setAuthors] = useState([]);
  const [paging, setPaging] = useState([])
  const [page, setPage] = useState(Number(params.get('page')) || 1)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function formatDate(date) {
    const newDate = new Date(date);
    return newDate.getDate() + '.' + (Number(newDate.getMonth()) + 1) + '.' + newDate.getFullYear() + '.';
  }

  const handlePrev = () => {
    let prevPage = 1;
    if (paging && page && (page > 1 && page <= paging.totalPages)) {
        prevPage = page - 1;
    }

    setPage(prevPage);
    params.set('page', (prevPage));
    navigate(`${location.pathname}?${params.toString()}`);
  }

 const handleNext = () => {
  let nextPage = 1;

  if (!paging || !page || (!isNaN(Number(page)) && page >= paging.totalPages)) {
    if (page == paging.totalPages) {
        nextPage = page;
    }
  }
  else {
    if (!isNaN(Number(page))) {
        nextPage = Number(page) + 1;
    }
  }

  setPage(nextPage);
  params.set('page', nextPage);
  navigate(`${location.pathname}?${params.toString()}`);
};

  useEffect(() => {
    const loadAuthors = async () => {
    try {
      setLoading(true);
      const data = await getAllAuthorsPaged(page);
      setPaging(data || []);
      setAuthors(data.items || []);
      setError('');
    } catch (error) {
      setError('Greska pri ucitavanju autora.');
    }
    setLoading(false);
  }
  loadAuthors()
  }, [page]);

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div id="authors-container">
      <h3>Prikaz autora</h3>
      <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Biografija</th>
              <th>Datum rodjenja</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
                <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.fullName}</td>
                    <td>{a.biography}</td>
                    <td>{formatDate(a.dateOfBirth)}</td>
                </tr>
            ))}
          </tbody>
      </table>
      <div className="paging">
        <button onClick={handlePrev} style={{margin: "1vh"}}>&lt;Previous</button>
        <button onClick={handleNext}>Next&gt;</button>
      </div>
    </div>
  );
}
export default Authors;