import React from "react";
import "../styles.scss";

const Publisher = ({p, onEdit, onDelete}) => {

  return (
    <tr className="publisher-row">
      <td>{p.id}</td>
      <td>{p.name}</td>
      <td>{p.address}</td>
      <td><a href="#">{p.website}</a></td>
    </tr>
  );
}
export default Publisher;