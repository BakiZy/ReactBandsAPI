import { useEffect, useState } from "react";
import axios from "axios";

const BandItem = (props) => {
  const [bands, setBands] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:44310/api/bendovi`).then((response) => {
      if (response.status !== 200) {
        throw new Error("Greska");
      }

      const bands = response.data;

      console.log(bands);
      const loadedBands = [];

      for (const key in bands) {
        loadedBands.push({
          key: key,
          id: bands[key].id,
          name: bands[key].name,
          yearCreate: bands[key].yearCreate,
        });
      }
      return setBands(loadedBands);
    });
  }, []);

  return (
    <>
      {props.bands.map((band) => {
        return (
          <select key={band.id} value={bands}>
            {band.id},{band.name},{band.yearCreate}
          </select>
        );
      })}
    </>
  );
};

export default BandItem;
