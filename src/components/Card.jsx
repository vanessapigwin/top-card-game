import PropTypes from "prop-types";
import "../styles/card.css";

function Card({ imgSrc, handleClick }) {
  return (
    <div className="card">
      <img src={imgSrc} onClick={handleClick}></img>
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Card;
