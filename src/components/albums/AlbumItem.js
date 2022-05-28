import classes from "./AlbumItem.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const AlbumItem = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <tr className={classes.AlbumItem}>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.genre}</td>
      <td>{props.yearPublish}</td>
      <td>{props.numberOfSales}</td>
      <td>{props.bandName}</td>
      {isLoggedIn && (
        <td>
          <button onClick={() => props.onRemove(props.id)}>Obrisi</button>
        </td>
      )}
      {isLoggedIn && (
        <td>
          <button onClick={() => props.onEdit(props.id)}>Izmeni</button>
        </td>
      )}
    </tr>
  );
};

export default AlbumItem;
