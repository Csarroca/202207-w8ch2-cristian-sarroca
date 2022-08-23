import { useEffect, useState } from "react";
import useAPI from "./hooks/useAPI";
interface IinitalState {
  count: number;
  starships: string[];
}
function App() {
  const { getStarships, starshipsFinal } = useAPI();

  const initialSate: IinitalState = {
    count: 0,
    starships: [],
  };
  const [data, setData] = useState(initialSate);
  useEffect(() => {
    (async () => {
      await getStarships();
      setData(await starshipsFinal);
    })();
  }, [getStarships, starshipsFinal]);

  return (
    <div id="background-container">
      <header id="header-title">Star Wars Test</header>
      <main id="main-container">
        <h2>Starships:</h2>
        <p id="total-ships">Total ships:{data.count} </p>
        <h2>Starships by class:</h2>
        <ul>
          {data.starships.map((ship) => (
            <li>{ship}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
export default App;
