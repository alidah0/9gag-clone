import { Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => (
  <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
    <IconButton icon="chevron-up" aria-label="updoot post" />
    {post.points}
    <IconButton icon="chevron-down" aria-label="downdoot post" />
  </Flex>
);
