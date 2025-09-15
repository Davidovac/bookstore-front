import React from "react";
import "../styles.scss";

const Book = ({b, onEdit, onDelete}) => {
  return (
    <tr className="book-row">
      <td>{b.title}</td>
      <td>{b.pageCount}</td>
      <td>{b.publishedDate}</td>
      <td>{b.isbn}</td>
      <td>{b.author.fullName}</td>
      <td>{b.publisher.name}</td>
      <td><input type="button" value="Edit" onClick={() => onEdit(b)} /></td>
      <td><input type="button" value="Delete" onClick={() => onDelete(b.id)} /></td>
    </tr>
  );
}
export default Book;