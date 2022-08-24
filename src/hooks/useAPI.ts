import { useCallback } from "react";

interface Istarships {
  count: number;
  starships: string[];
}
interface dataShips {
  starship_class: string;
}

// useCallback(() => {
//   (async () => {})();
// }, []);

const url = process.env.REACT_APP_API_URL as string;

const allUrls: string[] = [
  `${url}?page=1`,
  `${url}?page=2`,
  `${url}?page=3`,
  `${url}?page=4`,
];

const useAPI = () => {
  const getStarships = useCallback(async () => {
    const starshipsFinal: Istarships = {
      count: 0,
      starships: [],
    };

    try {
      await Promise.all(
        allUrls.map(async (url: string) => {
          const response = await fetch(url);

          const data = await response.json();
          const { count } = data;
          starshipsFinal.count = count;
          const starships = data.results;

          starships.forEach((element: dataShips) => {
            starshipsFinal.starships.push(element.starship_class);
          });
        })
      );
    } catch (error) {
      return error;
    }
    return starshipsFinal;
  }, []);

  return { getStarships };
};

export default useAPI;
