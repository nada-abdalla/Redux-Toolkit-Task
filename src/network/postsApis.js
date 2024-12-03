import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// fetch Posts data
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

// adding new post
export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    postInfo
  );
  return response.data;
});

// delete post
export const deletePostApi = async (postId) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  });
};
