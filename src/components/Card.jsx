import "../styles/card.css";

export default function Card({ imgSrc, handleClick }) {
  return (
    <div className="card">
      <img src={imgSrc} onClick={handleClick}></img>
    </div>
  );
}
