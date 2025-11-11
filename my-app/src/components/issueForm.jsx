import React, { useState } from 'react';
import "../styles.scss";
import { useForm } from 'react-hook-form';
import { createIssue } from "../services/comics.service";

const IssueForm = ({issue, volumeId, setSelectedIssue}) => {
  const { register, handleSubmit, formState } = useForm({
      defaultValues: {},
    });;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await createIssue(volumeId, data, issue.id);
      alert('Uspesno ste napravili vasu verziju izdanja');
      setSelectedIssue(null);
    }catch(error) {
      if (error.response) {
        if (error.response.status == 400) {
          if (error.response.data.error) {
            setError(error.response.data.error);
          }
          else {
            setError('Neuspešna registracija. Proveri podatke.');
          }
        }else if (error.response.status == 500) {
          setError('Greska na serveru. Pokusajte kasnije.');
        }else if (error.response.status == 400) {
          setError('Niste uneli validne podatke. Pokusajte kasnije.');
        }else if (error.response.status == 401) {
          setError('Niste ulogovani ili ne posedujete adekvatne dozvole. Pokusajte kasnije.');
        }else if (error.response.status == 404) {
          setError('Izdanje sa ovim id-em ne postoji. Pokusajte kasnije.');
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
    <div id='issue-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Dodaj informacije za izdanje:</h2>
        <h2 className='form-issue-name'>{issue.name}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="number" placeholder="Broj stranica" {...register("pagesCount", { required: 'Ovo polje je obavezno' })} />
        {formState.errors.pagesCount && <p style={{ color: 'red' }}> {formState.errors.pagesCount.message}</p>}

        <input type="number" placeholder="Cena" {...register("price", { required: 'Ovo polje je obavezno' })} />
        {formState.errors.price && <p style={{ color: 'red' }}> {formState.errors.price.message}</p>}

        <input type="number" placeholder="Dostupno kopija" {...register("copiesAvailable", { required: 'Ovo polje je obavezno' })} />
        {formState.errors.copiesAvailable && <p style={{ color: 'red' }}> {formState.errors.copiesAvailable.message}</p>}

        <textarea placeholder="Opis" {...register("description", { required: 'Ovo polje je obavezno' })} />
        {formState.errors.description && <p style={{ color: 'red' }}> {formState.errors.description.message}</p>}

        <button className='buttons create-btn' type="submit">Kreiraj izdanje</button>
      </form>
    </div>
  );
};

export default IssueForm;