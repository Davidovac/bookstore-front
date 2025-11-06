import React, { useState, useContext } from 'react';
import { register } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import UserContext from './userContext';
import "../styles.scss";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await register({
        username,
        email,
        name,
        surname,
        password
      });

      if (response.status == 204) {
        alert('Uspesno ste se registrovali');
      } 
      navigate('/login');
    }catch(error) {
      if (error.response) {
        if (error.response.status == 400) {
          if (error.response.data.error) {
            setError(error.response.data.error);
          }
          else {
            setError('Neuspešna registracija. Proveri podatke.');
          }
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
    <form onSubmit={handleRegister} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Registracija</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input type="text" placeholder="Korisničko ime"
          value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Name"
          value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Surname"
          value={surname} onChange={(e) => setSurname(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Lozinka"
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Registruj se</button>
    </form>
  );
};

export default Register;