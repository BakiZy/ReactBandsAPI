import AlbumList from "./components/albums/AlbumList";
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Card from "./components/UI/Card";
import Home from "../src/pages/Home";
import Navigation from "./components/UI/Navigation";
import AuthContext from "./store/auth-context";
import NotFound from "./pages/NotFound";
import AlbumPage from "./pages/Album";
import LoginPage from "./pages/Login";
import ProfileForm from "./components/Auth/ProfileForm";

function App() {
  const authCtx = useContext(AuthContext);

  console.log(
    "appstarts. isloggedin state: " +
      authCtx.isLoggedIn +
      ", token:  " +
      authCtx.token
  );

  return (
    <Card>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authentication" element={<LoginPage />} />
        <Route
          path="/account"
          element={authCtx.isLoggedIn ? <ProfileForm /> : <NotFound />}
        />
        <Route path="/album/:albumId" element={<AlbumPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Card>
  );
}

export default App;
