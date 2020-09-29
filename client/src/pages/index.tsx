import React from "react";
import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      <NavBar />
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data?.posts.map((p) => (
          <div key={p.id}>
            <h2>{p.title}</h2>
            <p>Created at: {new Date(Number(p.createdAt)).toUTCString()}</p>
            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
