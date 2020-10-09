import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<"updoot-loading" | "downdoot-loading" | "not-loading">("not-loading")
  const [_, vote] = useVoteMutation()
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton onClick={async () => {
        setLoadingState("updoot-loading")
        await vote({
          postId: post.id, value: 1
        })
        setLoadingState("not-loading")
      }} isLoading={loadingState === "updoot-loading"} variantColor={post.voteStatus === 1 ? "green" : undefined} icon="chevron-up" aria-label="updoot post" />
      {post.points}
      <IconButton onClick={async () => {
        setLoadingState("downdoot-loading")
        await vote({
          postId: post.id, value: -1
        })
        setLoadingState("not-loading")
      }} isLoading={loadingState === "downdoot-loading"} variantColor={post.voteStatus === -1 ? "red" : undefined} icon="chevron-down" aria-label="downdoot post" />
    </Flex>
  )
}
