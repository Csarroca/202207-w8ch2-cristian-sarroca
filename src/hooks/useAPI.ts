interface Istarships {
  count: number;
  starships: string[];
}
interface dataShips {
  starship_class: string;
}

const useAPI = () => {
  const url = process.env.REACT_APP_API_URL as string;
  const allUrls: string[] = [
    `${url}?page=1`,
    `${url}?page=2`,
    `${url}?page=3`,
    `${url}?page=4`,
  ];
  const starshipsFinal: Istarships = {
    count: 0,
    starships: [],
  };

  const getStarships = async () => {
    let data;
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
    return data;
  };
  return { getStarships, starshipsFinal };
};

export default useAPI;
