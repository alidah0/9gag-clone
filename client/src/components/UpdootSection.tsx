import { Box, Flex, IconButton } from "@chakra-ui/core";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import { EditDeletePostButton } from "./EditDeletePostButtons";
import { ApolloCache } from "@apollo/client";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();
  return (
    <>
      <Box mt={2}>{post.points} points</Box>
      <Flex direction="row" alignItems="center" mr={4} mt={4}>
        <IconButton
          onClick={async () => {
            setLoadingState("updoot-loading");
            await vote({
              variables: {
                postId: post.id,
                value: 1,
              },
              update: (cache) => updateAfterVote(1, post.id, cache),
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "updoot-loading"}
          variantColor={post.voteStatus === 1 ? "green" : undefined}
          icon="chevron-up"
          aria-label="updoot post"
          mr={2}
        />
        <IconButton
          onClick={async () => {
            setLoadingState("downdoot-loading");
            await vote({
              variables: {
                postId: post.id,
                value: -1,
              },
              update: (cache) => updateAfterVote(-1, post.id, cache),
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "downdoot-loading"}
          variantColor={post.voteStatus === -1 ? "red" : undefined}
          icon="chevron-down"
          aria-label="downdoot post"
          mr={2}
        />
        <EditDeletePostButton id={post.id} creatorId={post.creator.id} />
      </Flex>
    </>
  );
};
