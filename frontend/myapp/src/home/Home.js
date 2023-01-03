import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Box position={"relative"} width="100%" height="90vh">
      <img src="/tikka.jpg" alt="food" width={"100%"} height="80%" />
      <Typography
        fontFamily={"Dancing Script, cursive"}
        variant="h3"
        fontWeight={"bold"}
        textAlign={"center"}
        width="100%"
        sx={{
          position: "absolute",
          top: "0px",
          color: "#3E3039",
          backgroundColor: "#A78116",
        }}
      >
        Let food be the medicine and medicine be the food.
      </Typography>
      <Box width="100%" height="20%" display={"flex"} flexDirection="column">
        <Typography
          fontFamily={" cursive"}
          textAlign={"center"}
          variant="h4"
          padding={4}
        >
          Let's Share Tasty Food Diaries...
        </Typography>
        <Box margin="auto">
          <Button variant="outlined" sx={{ marginRight: 2 }}>
            Share your Diary
          </Button>
          <Button
            LinkComponent={Link}
            to="/diaries"
            variant="contained"
            sx={{ marginLeftt: 2 }}
          >
            View your Diaries
          </Button>
        </Box>
      </Box>{" "}
    </Box>
  );
};

export default Home;
