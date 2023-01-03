import React, { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Link } from "react-router-dom";
const Arr = ["home", "diaries", "auth"];
const loggedInArr = ["home", "diaries", "add", "profile"];
const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar sx={{ bgcolor: "black", position: "sticky" }}>
      <Toolbar>
        <RestaurantMenuIcon />
        <Tabs
          value={value}
          onChange={(e, va) => setValue(va)}
          sx={{ marginLeft: "auto", textDecoration: "none" }}
        >
          {isLoggedIn
            ? loggedInArr.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`${link === "home" ? " " : link}`}
                  key={link}
                  label={link}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: "10px",
                    },
                  }}
                />
              ))
            : Arr.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`${link === "home" ? " " : link}`}
                  key={link}
                  label={link}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: "10px",
                    },
                  }}
                />
              ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
