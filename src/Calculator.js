import { memo, useCallback, useEffect, useState } from 'react';

import clickSound from './ClickSound.m4a';


function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;


  useEffect(function () {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);

    // playSound();
  }, [number, durationBreak, sets, speed]);
  // REMARQUE: Il n'y a donc qu'une seule mise à jour, ce qui, à notre
  // avis, ne donne qu'un seul rendu. Mais en fait, nous avons deux rendus.
  // La calculatrice est donc rendue. Et encore une fois, c'est exactement le problème du crochet
  // useEffect pour mettre à jour les états. Donc, juste ici. En fait, cette première mise à jour de
  // l'état correspond à la mise à jour du nombre de jeux, ce qui déclenchera l'effet suivant. Mais l'effet ne se produit qu'une
  // fois que le rendu a déjà eu lieu. Ainsi, lorsque nous définissons à nouveau l'état
  // ici, nous obtenons un second rendu. React n'est donc pas en mesure de regrouper ces deux rendus en un
  // seul, simplement parce que, encore une fois, l'effet s'exécute bien après que le rendu ait déjà eu lieu.

  // IMPORTANT: a chaque fois que ikon un re-render toutes les fonctions ce qui recréera cette fonction ici.

  useEffect(() => {
    function playSound() {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    }

    playSound();

  }, [duration, allowSound]);


  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
    // playSound();
  }

  function handleDec() {
    setDuration((duration) => duration > 1 ? Math.ceil(duration) - 1 : 0);
    // playSound();
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {
              workouts.map((workout) => (
                <option value={workout.numExercises} key={workout.name}>
                  {workout.name} ({workout.numExercises} exercises)
                </option>
              ))
            }
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type='range'
            min='1'
            max='5'
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type='range'
            min='30'
            max='180'
            step='30'
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type='range'
            min='1'
            max='10'
            value={durationBreak}
            onChange={(e) => {
              setDurationBreak(e.target.value)
            }}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && '0'}
          {mins}:{seconds < 10 && '0'}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
