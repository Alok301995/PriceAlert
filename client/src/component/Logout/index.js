import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  const [logout, setLogout] = useState(false);
  // Main
  useEffect(async () => {
    const response = await axios.get("/logout");
    props.setLogin(false);
    setLogout(true);
  }, []);

  // End of Main
  {
    if (logout) {
      return <Redirect to="/" />;
    } else {
      return false;
    }
  }
};

export default Logout;
