import React from "react";
import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Box, Heading, Stack, Text, Link, Button, Tag } from "@chakra-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <NextLink href="/create-post">
        <Button mb={3} variantColor="blue">
          Create Post
        </Button>
      </NextLink>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data?.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
