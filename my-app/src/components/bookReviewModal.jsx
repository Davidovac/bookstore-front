import React, { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { addReview } from "../services/reviews.service.jsx";
import "../styles.scss";
import UserContext from "./userContext.jsx";

const BookReviewModal = ({ onReviewSubmit }) => {
  const { user } = useContext(UserContext);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!user) return (<p>Ocenjivanje knjige nije moguce jer niste ulogovani!</p>);
  return (
    <div className="form-modal" onClick={(e) => e.stopPropagation()}>
      <h3>Ocenite knjigu i ostavite utisak!</h3>
      <div className="rating-block">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`rating-star ${star <= selectedRating ? "selected" : "" }
            ${star <= hoveredRating ? "selected" : ""}`}
            onMouseOver={() => setHoveredRating(star)}
            onClick={() => setSelectedRating(star)}
            onMouseLeave={() => setHoveredRating((selectedRating > 0) ? selectedRating : 0)}
          >
            ★
          </span>
        ))}
      </div>
      <div className="comment-block">
        <textarea onChange={(e) => setComment(e.target.value)} placeholder="Obrazlozite ocenu"></textarea>
      </div>
      <div className="review-button-wrapper">
        <button className="buttons edit-btn" type="button" onClick={(e) => onReviewSubmit({rating: selectedRating, comment: comment})}>Posalji ocenu</button>
      </div>
    </div>
  );
}
export default BookReviewModal;