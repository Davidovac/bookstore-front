import React from "react";
import "../styles.scss";

const Book = ({b, onEdit, onDelete}) => {
  function formatDate(date) {
    date = new Date(date);
    const formatted = date.getDate() + '.' + (Number(date.getMonth()) + 1) + '.' + date.getFullYear() + '.';
    return formatted
  }
  

  return (
    <tr className="book-row">
      <td>{b.title}</td>
      <td>{b.author.fullName}</td>
      <td>{b.pageCount}</td>
      <td>{formatDate(b.publishedDate)}</td>
      <td>{b.isbn}</td>
      <td>{b.publisher.name}</td>
      <td><input type="button" value="Edit" onClick={() => onEdit()} /></td>
      <td><input type="button" value="Delete" onClick={() => onDelete(b.id)} /></td>
    </tr>
  );
}
export default Book;