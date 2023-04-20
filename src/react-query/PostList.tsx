import React from "react";

import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return <p>isLoading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group mb-2">
        {data?.pages.map((page) => (
          <>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </>
        ))}
      </ul>

      <button
        className="btn btn-primary"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "...Loading" : "Load More"}
      </button>
    </>
  );
};

export default PostList;
