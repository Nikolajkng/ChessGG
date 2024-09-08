import { createEffect, createResource, createSignal, For, Index, type Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

type ChessPiece = "Knight" | "Pawn" | "King";

const coords = (index: number) => [index % 8, Math.floor(index / 8)];




const App: Component = () => {

  const [pieces, setPieces] = createSignal<number[]>(Array.from(Array(64).keys()));
  const [seletedPiece, setSelectedPiece] = createSignal<null | number>(null);

  const [randomNumber] = createResource(async () => {
    return (await fetch("http://www.randomnumberapi.com/api/v1.0/random")).json();
  });

  createEffect(() => {
    console.log(randomNumber);
  })



  const highlighted = () => {
    const selected = seletedPiece()
    if (selected !== null) {
      return [selected - 10, selected + 10,]
    }
    return [];
  }

  return <div style={{ width: "100%", display: "flex", "justify-content": "center" }}>
    <div style={{ display: "grid", "grid-template-columns": "auto auto auto auto auto auto auto auto", margin: "100px", "width": "800px", "height": "800px" }}>
      <Index each={pieces()}
        children={(value, index) => {
          const myStyle = () => {
            const background = index === seletedPiece() ? "red" : ((index + (Math.floor(index / 8))) % 2 === 0 ? "white" : "LightGray");
            const isHighlighted = highlighted().find((id: number) => id === index) !== undefined;
            const color = isHighlighted ? "blue" : undefined;
            return { background, color, "border-radius": "0" }
          }

          const [x, y] = coords(index);

          return <button
            style={myStyle()}
            onclick={(e) => {
              const selected = seletedPiece();
              if (selected === null || selected === undefined) {
                setSelectedPiece(index);
              } else {
                let newPieces = [...pieces()];
                newPieces[index] += newPieces[selected];
                newPieces[selected] = 0;
                setPieces(newPieces);
                setSelectedPiece(null);
              }
            }
            }>

            {value()} Ligger på {x}, {y}
          </button>
        }}
      />
    </div>
    <h1>{JSON.stringify(randomNumber())} {randomNumber.state}</h1>
  </div>
};

export default App;
