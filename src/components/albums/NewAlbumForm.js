import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewAlbumForm.module.css";
import axios from "axios";
import Card from "../UI/Card";

const NewAlbumForm = (props) => {
  const [bandForm, setBandForm] = useState({
    id: "",
    bandName: "",
    yearCreate: 0,
  });
  const [bands, setBands] = useState([]);
  const [loadingBands, setLoadingBands] = useState(true);
  const nameInputRef = useRef();
  const yearPublishInputRef = useRef();
  const genreInputRef = useRef();
  const numberOfSalesInputRef = useRef();
  const bandInputRef = useRef();

  //   let enteredName = nameInputRef.current.value;
  //   let enteredYearPublish = yearPublishInputRef.current.value;
  //   let enteredGenre = genreInputRef.current.value;
  //   let enteredNumberOfSales = numberOfSalesInputRef.current.value;

  const navigate = useNavigate();

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
    setLoadingBands(false);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredYearPublish = yearPublishInputRef.current.value;
    const enteredGenre = genreInputRef.current.value;
    const enteredNumberOfSales = numberOfSalesInputRef.current.value;
    const selectedBand = bandInputRef.current.value;

    setLoadingBands(false);
    if (
      enteredName.length > 3 &&
      enteredName.length < 80 &&
      enteredYearPublish > 1950 &&
      enteredYearPublish < 2020 &&
      enteredGenre.length > 3 &&
      enteredGenre.length < 50 &&
      enteredNumberOfSales > 0 &&
      enteredNumberOfSales < 100
    ) {
      const response = axios
        .post("https://localhost:44310/api/albumi", {
          name: enteredName,
          yearPublish: enteredYearPublish,
          genre: enteredGenre,
          numberOfSales: enteredNumberOfSales,
          bandId: selectedBand,
        })
        .then(function (response) {
          navigate("/");
        })
        .catch((error) => {
          console.log("oops something went wrong" + error.message);
        });
      console.log(response);
    } else {
      alert("Unesite ispravne podatke");
      throw new Error("Greska");
    }
  };

  const BandList = () => {
    return (
      <select
        id="bandName"
        name="bandName"
        ref={bandInputRef}
        value={bandForm}
        onChange={(e) => setBandForm(e.target.value)}
      >
        {bands.map((band) => (
          <option id={band.id} key={band.id} value={band.id}>
            {band.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <Card>
      <h1>Unos novih podataka</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Ime albuma</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="yearPublish">Godina izdavanja</label>
          <input
            type="number"
            id="yearPublish"
            name="yearPublish"
            ref={yearPublishInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="genre">Zanr</label>
          <input
            type="text"
            id="genre"
            name="genre"
            ref={genreInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="numberOfSales">Broj prodanih albuma u mil</label>
          <input
            type="number"
            id="numberOfSales"
            name="numberOfSales"
            ref={numberOfSalesInputRef}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="bandName">Ime benda</label>
          <BandList />
        </div>

        <div className={classes.action}>
          <button type="submit">Posalji</button>
        </div>
      </form>
    </Card>
  );
};

export default NewAlbumForm;
