import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePostAction } from "./postsSlice";
import { useForm, Controller } from "react-hook-form";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const onSubmit = (data) => {
    // Dispatch addPost action with form data
    dispatch(addPost(data)).then(() => {
      reset(); // Reset form fields
      toast.success("Post added successfully");
    });
  };

  const handleDelete = (postId) => {
    dispatch(deletePostAction(postId))
      .then(() => {
        toast.success("Post deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting post");
      });
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {post.id} - {post.title}
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <Link
                          to={`/details/${post.id}`}
                          // state: { postId: post.id }
                          className="btn btn-info"
                        >
                          View Details
                        </Link>
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(post.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{
                      required:
                        "Error: Title should contain at least one alphanumeric character.",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Title"
                      />
                    )}
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}

                  <Controller
                    name="body"
                    control={control}
                    defaultValue=""
                    rules={{
                      required:
                        "Error: Body should contain at least one alphanumeric character.",
                      minLength: {
                        value: 10,
                        message: "Body must be at least 10 characters",
                      },
                    }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="form-control mb-2"
                        placeholder="Body"
                        rows="4"
                      />
                    )}
                  />
                  {errors.body && (
                    <p className="text-danger">{errors.body.message}</p>
                  )}

                  <button className="btn btn-success" type="submit">
                    <FontAwesomeIcon icon={faPlus} /> Add Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default PostsList;
