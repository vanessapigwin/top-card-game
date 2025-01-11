import "../styles/card.css";

export default function Card({ imgSrc }) {
  return (
    <div className="card">
      <img src={imgSrc}></img>
    </div>
  );
}
