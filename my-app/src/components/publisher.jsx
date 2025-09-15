import React from "react";
import "../styles.scss";

const Publisher = ({p, onEdit, onDelete}) => {

  return (
    <tr className="publisher-row">
      <td>{p.name}</td>
      <td>{p.address}</td>
      <td><a href="#">{p.website}</a></td>
      <td><input type="button" value="Edit" onClick={onEdit} /></td>
      <td><input type="button" value="Delete" onClick={onDelete} /></td>
    </tr>
  );
}
export default Publisher;