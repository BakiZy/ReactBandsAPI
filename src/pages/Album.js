import { useState, useEffect, useRef } from "react";
import Card from "../components/UI/Card";
import classes from "./Album.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function AlbumPage(props) {
  const params = useParams();
  const { albumId } = params;
  const [name, setName] = useState("");
  const [yearPublish, setYearPublish] = useState(0);
  const [genre, setGenre] = useState("");
  const [numberOfSales, setNumberOfSales] = useState(0);
  const [bands, setBands] = useState([]);
  const [bandName, setBandName] = useState("");
  const nameInputRef = useRef();

  useEffect(() => {
    axios
      .get(`https://localhost:44310/api/albumi/${albumId}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Greska");
        }

        const album = response.data;
        console.log(album);
        setName(album.name);
        setYearPublish(album.yearPublish);
        setGenre(album.genre);
        setNumberOfSales(album.numberOfSales);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [albumId]);

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
      setBands(loadedBands);
    });
  }, []);

  const BandList = () => {
    return (
      <select
        id="bandName"
        name="bandName"
        value={bandName}
        onChange={(e) => setBandName(e.target.value)}
      >
        {bands.map((band) => (
          <option key={band.id}>{band.name}</option>
        ))}
      </select>
    );
  };

  const updateAlbumHandler = (event) => {
    event.preventDefault();
    const response = axios.put(
      `https://localhost:44310/api/albumi/${albumId}`,
      {
        name: name,
        yearPublish: yearPublish,
        genre: genre,
        numberOfSales: numberOfSales,
        bandName: bandName,
      }
    );
    console.log(response);
  };

  return (
    <Card>
      <form onSubmit={updateAlbumHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Ime albuma</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameInputRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="yearPublish">Godina izdavanja</label>
          <input
            type="number"
            id="yearPublish"
            name="yearPublish"
            value={yearPublish}
            onChange={(e) => setYearPublish(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="genre">Zanr</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="numberOfSales">Broj prodanih albuma u mil</label>
          <input
            type="number"
            id="numberOfSales"
            name="numberOfSales"
            value={numberOfSales}
            onChange={(e) => setNumberOfSales(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="bandName">Ime benda</label>
          <BandList />
        </div>
        <div className={classes.action}>
          <button type="submit">Izmeni</button>
        </div>
      </form>
    </Card>
  );
}

export default AlbumPage;
