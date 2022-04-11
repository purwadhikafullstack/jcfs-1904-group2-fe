import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navigation from "./components/Navigation/index";
import Register from "./Pages/Register";
import Forgotpass from "./Pages/Login/forgotpass";
import EditProfile from "./Pages/EditProfile";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { keepLoginAction } from "./store/actions";

function App() {
  const [isLocalStorageChecked, setIsLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userData");
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);

      const { id, username, role, tokens } = userData;

      dispatch(keepLoginAction({ id, username, role, tokens }));
    }

    setIsLocalStorageChecked(true);
  }, []);

  if (isLocalStorageChecked) {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<Forgotpass />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    );
  } else {
    return <h1> Loading .. </h1>;
  }
}

export default App;
