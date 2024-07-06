import { useState } from "react";

import Calculator from "./Calculator";
import { CounterTimer, formatTime } from "./CounterTimer";


function App() {
  const [allowSound, setAllowSound] = useState(true);

  const partOfDay = formatTime(new Date()).slice(-2);
  const workouts = [
    {
      name: "Full-body workout",
      numExercises: partOfDay === "AM" ? 9 : 8,
    },
    {
      name: "Arms + Legs",
      numExercises: 6,
    },
    {
      name: "Arms only",
      numExercises: 3,
    },
    {
      name: "Legs only",
      numExercises: 4,
    },
    {
      name: "Core only",
      numExercises: partOfDay === "AM" ? 5 : 4,
    },
  ];

  return (
    <main>
      <CounterTimer allowSound={allowSound} setAllowSound={setAllowSound} >
        <Calculator workouts={workouts} allowSound={allowSound} />
      </CounterTimer>
    </main>
  );
}



export default App;
