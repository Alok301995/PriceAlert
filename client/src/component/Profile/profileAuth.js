import React, { useEffect, useState } from "react";
import Profile from "../Profile/index";
import { Redirect } from "react-router-dom";

const ProfileAuth = ({ login }) => {
  return (
    <React.Fragment>
      {login && <Profile />}
      {!login && <Redirect to="/" />}
    </React.Fragment>
  );
};

export default ProfileAuth;
