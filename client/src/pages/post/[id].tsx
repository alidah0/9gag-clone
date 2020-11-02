import { Box, Heading } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { EditDeletePostButton } from "../../components/EditDeletePostButtons";
import Layout from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading, error } = usePostQuery({
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>{error}</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find a post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <head>
        <title>{data.post.title}</title>
      </head>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>
        <img src={data.post.memePic} alt={data.post.title} />
      </Box>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButton
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
