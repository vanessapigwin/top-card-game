import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import matcha from "./assets/matcha.jpg";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imgList, setImgList] = useState([
    matcha,
    matcha,
    matcha,
    matcha,
    matcha,
    matcha,
    matcha,
    matcha,
    matcha,
  ]);

  console.log(window.innerWidth);

  return (
    <>
      <div className="container title">
        <h1>Cat Memo Game</h1>
        <div className="scorecard">
          <span>Current Score: {currentScore}</span>
          <span>High Score: {highScore}</span>
        </div>
      </div>

      <div className="container card-area">
        {imgList.map(img => <Card imgSrc={img} key={crypto.randomUUID()}></Card>)}
      </div>
    </>
  );
}

export default App;
