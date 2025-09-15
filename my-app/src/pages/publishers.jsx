import React, { useState, useEffect } from "react";
import "../styles.scss";
import Publisher from "../components/publisher.jsx";
import { getAllPublishers } from "../services/publishers.service.jsx";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPublishers = async () => {
    try {
      setLoading(true);
      const data = await getAllPublishers();
      setPublishers(data || []);
      setError('');
    } catch (error) {
      setError('Greska pri ucitavanju izdavaca.');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPublishers();
  }, []);

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div id="publishers-container">
      <h3>Prikaz izdavaca</h3>
      <table>
          <thead>
            <tr>
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