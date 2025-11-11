import React, { useState } from "react";
import "../styles.scss";
import { useNavigate } from "react-router-dom";
import { getVolumesByName } from "../services/comics.service";

const Comics = () => {
  const [volumes, setVolumes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setTitle((prev) => (e.target.value));
  };

  const loadVolumes = async () => {
      try {
        setLoading(true);
        const data = await getVolumesByName(title);
        setVolumes(data || []);
        setError('');
      } catch (error) {
        setError('Greska pri ucitavanju tomova.');
      }
      setLoading(false);
    }

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div id="comics-container">
      <h3>Pretraga tomova</h3>
      <div className="comics-search-block">
         <input type="text" placeholder="Pretrazi naslov toma" name="title" value={title} onChange={handleFilterChange} />
        <button type="button" onClick={(e) => loadVolumes()} className="buttons edit-btn">Pretrazi</button>
      </div>
      <table className={volumes && volumes.length > 0 ? "" : "hidden"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Godina Izdavanja</th>
            </tr>
          </thead>
          <tbody>
            {volumes.map((v) => (
              <tr key={v.id} onClick={(e) => navigate("/comic/" + v.id + "/issues?comicName=" + v.name)} className="volume-row">
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.startYear}</td>
              </tr>
            ))}
          </tbody>
      </table>
      {volumes.length == 0 && <p>Nema rezultata</p>}
    </div>
  );
}
export default Comics;