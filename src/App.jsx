import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [selected, setSelected] = useState([]);
  const [imgList, setImgList] = useState([]);
  const url = "https://api.thecatapi.com/v1/images/search?limit=10";

  function dealCards(selectedCards, apiCards) {
    if (selectedCards.length === 0) return apiCards;

    const cards = apiCards;
    const randomSelection = Math.floor(Math.random() * selectedCards.length);
    const replaceIndex = Math.floor(Math.random() * 8);
    cards[replaceIndex] = selectedCards[randomSelection];
    return cards;
  }

  function selectCard(e) {
    const link = e.target.src;

    if (selected.includes(link)) {
      setHighScore(currentScore);
      setCurrentScore(0);
      setSelected([]);
      alert("Meow! Game Over!");
    } else {
      const newSelected = [...selected, link];
      setSelected(newSelected);
      setCurrentScore(currentScore + 1);
    }
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const urlList = data.map((d) => d.url);
          urlList.length = 8;
          const newCards = dealCards(selected, urlList);
          setImgList(newCards);
        });
    }

    return () => {
      ignore = true;
    };
  }, [selected]);

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
        {imgList.map((img) => (
          <Card
            imgSrc={img}
            handleClick={selectCard}
            key={crypto.randomUUID()}
          ></Card>
        ))}
      </div>
    </>
  );
}

export default App;
