import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import { addPost } from "../api/Api";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    title: " ",
    description: " ",
    location: " ",
    imageUrl: " ",
    date: " ",
  });
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onResRecieved = (data) => {
    console.log(data);
    navigate("/diaries");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addPost(inputs)
      .then(onResRecieved)
      .catch((err) => console.log(err));
  };
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      width={"100%"}
      height="100%"
      bgcolor={"#FCF495"}
    >
      <Box display={"flex"} margin="auto" padding={2}>
        <Typography variant="h4" fontFamily={" cursive"} color="#4D6C69">
          Did you explore SOMETHING new...
        </Typography>
        <SoupKitchenIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "magenta" }}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          padding={3}
          margin="auto"
          flexDirection={"column"}
          width="80%"
        >
          <FormLabel>Title</FormLabel>
          <TextField
            onChange={handleChange}
            name="title"
            value={inputs.title}
            margin="normal"
            variant="standard"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            onChange={handleChange}
            name="description"
            value={inputs.description}
            margin="normal"
            variant="standard"
          />
          <FormLabel>Image URL</FormLabel>
          <TextField
            onChange={handleChange}
            name="imageUrl"
            value={inputs.imageUrl}
            margin="normal"
            variant="standard"
          />
          <FormLabel>Location</FormLabel>
          <TextField
            onChange={handleChange}
            name="location"
            value={inputs.location}
            margin="normal"
            variant="standard"
          />
          <FormLabel>Date</FormLabel>
          <TextField
            onChange={handleChange}
            type="date"
            name="date"
            value={inputs.date}
            margin="normal"
            variant="standard"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "#46605D",
              width: "50%",
              margin: "auto",
              mt: 2,
              borderRadius: 3,
            }}
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Add;
