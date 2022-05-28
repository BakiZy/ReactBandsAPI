import classes from "./AlbumList.module.css";
import AlbumItem from "../albums/AlbumItem";
import AuthContext from "../../store/auth-context";
import React, { Fragment, useContext } from "react";

const AlbumList = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const albumList = props.albums.map((album) => {
    return (
      <AlbumItem
        key={album.id}
        id={album.id}
        name={album.name}
        genre={album.genre}
        yearPublish={album.yearPublish}
        numberOfSales={album.numberOfSales}
        bandName={album.bandName}
        onRemove={props.onRemove}
        onEdit={props.onEdit}
      />
    );
  });

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Unique album Id</th>
            <th>Ime albuma</th>
            <th>Žanr</th>
            <th>Godina izdavanja</th>
            <th>Broj prodaje</th>
            <th>Naziv benda</th>
            {isLoggedIn && <th>Obrisi</th>}
            {isLoggedIn && <th>Izmeni</th>}
          </tr>
        </thead>
        <tbody>{albumList}</tbody>
      </table>
    </>
  );
};

export default AlbumList;
