import React, { useState, useEffect } from "react";
import "../styles.scss";
import Publisher from "../components/publisher.jsx";
import { getAllPublishers } from "../services/publishers.service.jsx";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [sort, setSort] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPublishers = async () => {
    try {
      setLoading(true);
      const data = await getAllPublishers(sort);
      setPublishers(data || []);
      setError('');
    } catch (error) {
      setError('Greska pri ucitavanju izdavaca.');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPublishers();
  }, [sort]);

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div id="publishers-container">
      <h3>Prikaz izdavaca</h3>
      <div className="sort-container">
        <select value={sort} onChange={e => setSort(Number(e.target.value))} name="sortSelect" id="sortSelect">
          <option value="0">Naziv Rastuce</option>
          <option value="1">Naziv Opadajuce</option>
          <option value="2">Adresa Rastuce</option>
          <option value="3">Adresa Opadajuce</option>
        </select>
      </div>
      <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Adresa</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((p) => (
              <Publisher key={p.id} p={p}/>
            ))}
          </tbody>
      </table>
    </div>
  );
}
export default Publishers;