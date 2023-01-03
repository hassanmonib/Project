import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails, postUpdate } from "../api/Api";
import { FormLabel, Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
const DiaryUpdate = () => {
  const [post, setPost] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
  });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getDetails(id)
      .then((data) => {
        setPost(data.post);
        setInputs({
          title: data.post.title,
          description: data.post.description,
          imageUrl: data.post.image,
          location: data.post.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs, id)
      .then((data) => console.log(data))
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
      {post && (
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
      )}
    </Box>
  );
};

export default DiaryUpdate;
