import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";

import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { deletePost } from "../api/Api";
const Diaryitem = ({ title, description, image, location, date, id, user }) => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = () => {
    if (localStorage.getItem("userId") === user) {
      return true;
    }
    return false;
  };
  const handleDelete = () => {
    deletePost(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setOpen(true);
  };

  return (
    <Card
      sx={{
        width: "50%",
        height: "65vh",
        margin: 1,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #9AA784",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <LocationOnIcon />
          </IconButton>
        }
        title={location}
        header={location}
        subheader={date}
      />
      <img height="194" src={image} alt={title} />
      <CardContent>
        <Typography variant="h6" color="text.secondary" paddingBottom={1}>
          {title}
        </Typography>
        <hr />
        <Box paddingTop={1} display="flex">
          <Typography width="170px" fontWeight={"bold"} variant="caption">
            Muneeb Hassan
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}{" "}
          </Typography>
        </Box>
      </CardContent>
      {isLoggedIn() && (
        <CardActions sx={{ marginLeft: "auto" }}>
          <IconButton LinkComponent={Link} to={`/posts/${id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Diaryitem;
