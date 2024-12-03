// import React, { useEffect, useState } from "react";
// import { fetchPosts } from "../features/posts/postsSlice";
// import { useDispatch, useSelector } from "react-redux";

// export default function DetailsPage() {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.postsData.posts);
//   const [visiblePostId, setVisiblePostId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   const handleViewDetails = (id) => {
//     // Set the clicked post ID to display its details
//     setVisiblePostId(id);
//   };

//   return (
//     <div>
//       {posts &&
//         posts.map((post) => (
//           <div key={post.id}>
//             <h5>
//               {post.id} - {post.title}
//             </h5>
//             <button onClick={() => handleViewDetails(post.id)}>
//               {visiblePostId === post.id ? "Hide Details" : "View Details"}
//             </button>

//             {/* Only display details for the selected post */}
//             {visiblePostId === post.id && (
//               <div>
//                 <p>{post.body}</p>{" "}
//                 {/* Show the post body only for the clicked post */}
//               </div>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { fetchPosts } from "../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // import useParams

export default function DetailsPage() {
  const dispatch = useDispatch();
  const { postId } = useParams(); // Get postId from the URL
  const posts = useSelector((state) => state.postsData.posts);
  const [visiblePost, setVisiblePost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts && postId) {
      const post = posts.find((post) => post.id === parseInt(postId)); // Find the specific post by ID
      setVisiblePost(post);
    }
  }, [posts, postId]);

  return (
    <div>
      {visiblePost ? (
        <div>
          <h5>
            {visiblePost.id} - {visiblePost.title}
          </h5>
          <p>{visiblePost.body}</p> {/* Show the details of the clicked post */}
        </div>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}
