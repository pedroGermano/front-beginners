import React, { useState } from "react";
import "./App.css";

interface ClickedProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);


  function getCord(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e;

    setClickedPoints([...clickedPoints, { clientX, clientY }]);
  }
  function handleUndo() {
    const newClickedPoint = [...clickedPoints]
    const undoPoint = newClickedPoint.pop()
    setClickedPoints(newClickedPoint)
    if (!undoPoint) return
    setUndoPoints([...undoPoints, undoPoint])
  }

  function handleRedo(){
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()
    if (!redoPoint) return
    setUndoPoints(newUndoPoints)
    setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    <>
      <button disabled={clickedPoints.length === 0} onClick={handleUndo}>Undo</button>
      <button disabled={undoPoints.length === 0}  onClick={handleRedo}>Redo</button>
      <div className="App" onClick={getCord}>
        {clickedPoints.map((clickedPoint, index) => {
          return (
            <div
              key={index}
              style={{
                left: clickedPoint.clientX - 6,
                top: clickedPoint.clientY - 6,
                position: "absolute",
              }}
            >
              🏈🏀⚽
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
