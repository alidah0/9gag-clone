import React from "react";
import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  if (!fetching && !data) {
    return <div>Something went wrong!, Query failed!!</div>;
  }

  return (
    <Layout>
      <Flex align="center" mb={4}>
        <Heading>Discuss Mania</Heading>
        <NextLink href="/create-post">
          <Button ml="auto" variantColor="blue">
            Create Post
          </Button>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>
          <Spinner />
        </div>
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
      <Flex>
        {data ? (
          <Button isLoading={fetching} m="auto" my={8}>
            Load More
          </Button>
        ) : null}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
