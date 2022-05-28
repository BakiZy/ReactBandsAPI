import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AlbumList from "../components/albums/AlbumList";
import classes from "./Home.module.css";
import axios from "axios";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setLoadedAlbums] = useState([]);
  // const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://localhost:44310/api/albumi");
      console.log(response);
      if (response.status !== 200) {
        console.log("response status" + response.status);
        throw new Error("Greska");
      }

      const responseData = await response.data;
      console.log(responseData);
      const loadedAlbums = [];

      for (const key in responseData) {
        loadedAlbums.push({
          key: key, // id albuma
          id: responseData[key].id,
          name: responseData[key].name,
          yearPublish: responseData[key].yearPublish,
          genre: responseData[key].genre,
          numberOfSales: responseData[key].numberOfSales,
          bandName: responseData[key].bandName,
        });
      }

      setLoadedAlbums(loadedAlbums);
      setIsLoading(false);
    };
    fetchData().catch((error) => {
      setIsLoading(false);
      console.log(error.message);
    });
  }, []);

  const handleRemove = useCallback((id) => {
    axios
      .delete(`https://localhost:44310/api/albumi/${id}`)
      .then((response) => {
        if (response.status !== 204) {
          console.log("response status" + response.status);
          throw new Error("Greska");
        }
      });

    navigate(0);
    alert("uspesno brisanje");
  }, []);

  const handleEdit = (id) => {
    navigate(`/album/${id}`);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading data...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Lista albuma</h1>
      <AlbumList albums={albums} onRemove={handleRemove} onEdit={handleEdit} />
    </section>
  );
}

export default Home;
