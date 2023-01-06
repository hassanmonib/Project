import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { getUserDetails } from "../api/Api";
import Diaryitem from "../diaries/Diaryitem";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);
  const handleClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <Box>
      {user && (
        <Button
          onClick={handleClick}
          sx={{ mr: "auto", width: "15%", color: "black" }}
          variant="contained"
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default Profile;
