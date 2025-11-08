import React, { useState, useContext } from 'react';
import { getGoogleToken, login } from '../services/auth.service';
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
    <div id='login-container'>
      <form onSubmit={handleLogin}>
        <h2>Prijava</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" placeholder="Korisničko ime"
            value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Lozinka"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        <section className='section-row'>
          <button className='buttons' type="submit">Prijavi se</button>
          <button className='buttons' type='button' onClick={(e) => window.location.href = "http://localhost:5234/api/GoogleDrive/authorize"}>Sign in with Google</button>
        </section>
        
      </form>
    </div>
    
  );
};

export default Login;