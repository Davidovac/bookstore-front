import React, { useState } from "react";
import Book from "../components/book.jsx";
import "../styles.scss";

const Books = () => {
  const [books, setBooks] = useState([]);
  return (
    <div id="books-container">
      <table>
        <tr>
          <thead>
            <th>Naslov</th>
            <th>Autor</th>
            <th>Br. stranica</th>
            <th>Datum izdavanja</th>
            <th>ISBN</th>
            <th>Izdavac</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {books.map((b) => (
              <Book key={b.id} b={b} onEdit={editBook} onDelete={deleteBook}/>
            ))}
          </tbody>
        </tr>
      </table>
    </div>
  );
}
export default Books;