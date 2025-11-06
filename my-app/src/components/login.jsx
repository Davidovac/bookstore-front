import React, { useState, useContext } from 'react';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import UserContext from './userContext';
import "../styles.scss";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({
        username,
        password
      });

      const token = response.data;
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
      alert('Uspesna prijava!');
      navigate('/profile');
    }catch(error) {
      if (error.response) {
        if (error.response.status == 400) {
          setError('Neuspešna prijava. Proveri podatke.');
        } else if (error.response.status == 500) {
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

  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Prijava</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input type="text" placeholder="Korisničko ime"
          value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Lozinka"
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Prijavi se</button>
    </form>
  );
};

export default Login;