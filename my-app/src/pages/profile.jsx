import React, { useState, useEffect, useContext } from "react";
import { getUserProfile } from "../services/user.service";
import UserContext from "../components/userContext";
import "../styles.scss";
import { useSearchParams  } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const loadProfile = async () => {
    try {
      if (user){
        const response = await getUserProfile(user.sub)
        setProfile(response);
      }
    }
    catch(error) {
      if (error.response) {
        if (error.response.status == 404) {
          setError('Korisnik sa ovim id-em ne postoji');
        }
        else if (error.response.status == 401)
          setError('Niste ulogovani');
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
    loadProfile();
  }, [user]);

  useEffect(() => {
    if (token && (token.length > 10) && !localStorage.getItem('token')) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);
  
  if (loading) return <div id="loadingSpinner" className="spinner"></div>;
  if (!user || !profile || error) return(
    <div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
  return(
    <div id="profile-container">
      <h3>Zadravo <strong>{profile.name} {profile.surname}</strong>!</h3>
      <p>Korisnicko ime: <strong>{profile.userName}</strong></p>
      <p>Email: <strong>{profile.email}</strong></p>
      <p>{profile && profile.roles && (profile.roles.length > 0) && (
        <>
          {profile.roles.length > 1 ? 'Uloge: ' : 'Uloga: '}
          <strong>
            {Array.isArray(profile.roles)
            ? profile.roles.join(', ')
            : profile.roles}
          </strong>
        </>
        )}
      </p>
    </div>
  );
}

export default Profile;