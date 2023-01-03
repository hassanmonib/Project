import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Diaryitem from "./Diaryitem";
import { getPosts } from "../api/Api";
const Diaries = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data?.posts))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      padding={3}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor="#393C34"
    >
      {posts &&
        posts.map((item, index) => (
          <Diaryitem
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            image={item.image}
            id={item._id}
            location={item.location}
            title={item.title}
            key={index}
            user={item.user}
          />
        ))}
    </Box>
  );
};

export default Diaries;
