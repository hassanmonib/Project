import axios from "axios";
export const getPosts = async () => {
  const res = await axios.get("/posts");
  if (res.status !== 200) {
    return console.log("Some error Occured");
  }

  return res.data;
};
export const sendAuthRequest = async (signup, data) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}/`, {
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    return console.log("Unable to authenticate");
  }
  const resData = await res.data;
  return resData;
};

export const addPost = async (data) => {
  const res = await axios
    .post("/posts/", {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));
  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getDetails = async (id) => {
  const res = await axios.get(`posts/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Can't get diary");
  }
  const resData = await res.data;
  return resData;
};

export const postUpdate = async (data, id) => {
  const res = await axios
    .put(`/posts/${id}`, {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageUrl,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to update");
  }
  const resData = await res.data;
  return resData;
};

export const deletePost = async (id) => {
  const res = await axios
    .delete(`/posts/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to Delete");
  }
  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("No user found");
  }
  const resData = await res.data;
  return resData;
};
