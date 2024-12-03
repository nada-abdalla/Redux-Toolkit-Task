import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, addPost, deletePostApi } from "../../network/postsApis"; // Ensure deletePostApi is the correct import

// Async action for deleting a post
const deletePostAction = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    // Call the API to delete the post
    await deletePostApi(postId); // Using the renamed deletePostApi
    return postId; // Return the postId to remove it from the state
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
        // Using deletePostAction instead of deletePost
        // Remove the deleted post from the state
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export { fetchPosts, addPost, deletePostAction }; // Export deletePostAction instead of deletePost
export default postsSlice.reducer;
