import { useEffect, useState } from "react";
import useAPI from "./hooks/useAPI";
export interface Istarships {
  count: number;
  starships: string[];
}
// interface IinitalState {
//   count: number;
//   starships: string[];
// }
function App() {
  // const initialSate: IinitalState = {
  //   count: 0,
  //   starships: [],
  // };
  const [data, setData] = useState({ count: 0, starships: [] } as Istarships);
  const { getStarships } = useAPI();

  useEffect(() => {
    (async () => {
      const naves = await getStarships();
      console.log(naves);
      setData(naves as Istarships);
    })();
  }, [getStarships]);

  return (
    <div id="background-container">
      <header id="header-title">Star Wars Test</header>
      <main id="main-container">
        <h2>Starships:</h2>
        <p id="total-ships">Total ships:{data.count} </p>
        <h2>Starships by class:</h2>
        <ul>
          {data.starships.map((ship: any) => (
            <li>{ship}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
export default App;
