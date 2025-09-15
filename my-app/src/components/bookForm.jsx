import React, {useEffect} from 'react';
import { useForm, useFormState } from 'react-hook-form';
import '../styles.scss';

const BookForm = ({ b, onSubmit }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // 01–12
  const day = String(d.getDate()).padStart(2, "0");        // 01–31
  return `${year}-${month}-${day}`;
}

  useEffect(() => {
    if (b) {
      const formatted = formatDate(b.publishedDate)
      b.publishedDate = formatted;
      reset(b);
    } 
  }, [b, reset]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Naslov:
          </label>
          <input type="text" {...register("title", { required: 'Ovo polje je obavezno' })} />
          {formState.errors.title && <p style={{ color: 'red' }}>{formState.errors.title.message}</p>}
        
        <br />

        <label>
          Autor:
          </label>
          <input type="number" {...register("authorId", { required: 'Ovo polje je obavezno' })} />
          {formState.errors.authorId && <p style={{ color: 'red' }}> {formState.errors.authorId.message}</p>}
        
        <br />

        <label>
          Br. stranica:
          </label>
          <input type="number" {...register("pageCount", { required: 'Ovo polje je obavezno', 
            min: { value: 1, message: "Br. stranica mora biti najmanje 1" },
            max: { value: 10000, message: "Br. stranica mora biti najvise 10000" }
            })} />
          {formState.errors.pageCount && <p style={{ color: 'red' }}>{formState.errors.pageCount.message}</p>}
        
        <br />

        <label>
          Datum izdavanja:
          </label>
          <input type="date" {...register("publishedDate", {required: 'Ovo polje je obavezno'})} />
          {formState.errors.publishedDate && <p style={{ color: 'red' }}>{formState.errors.publishedDate.message}</p>}
        
        <br />

        <label>
          ISBN:
          </label>
          <input type="number" {...register("isbn", { required: 'Ovo polje je obavezno', 
            minLength: { value: 13, message: "ISBN mora imati 13 cifara" },
            maxLength: { value: 13, message: "ISBN mora imati 13 cifara" }
            })} />
          {formState.errors.isbn && <p style={{ color: 'red' }}>{formState.errors.isbn.message}</p>}
        
        <br />

        <label>
          Izdavac:
          </label>
          <input type="number" {...register("publisherId", { required: 'Ovo polje je obavezno',
            min: {value: 1, message: "ID mora biti veci od 0"}
           })} />
          {formState.errors.publisherId && <p style={{ color: 'red' }}>{formState.errors.publisherId.message}</p>}
        

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default BookForm;