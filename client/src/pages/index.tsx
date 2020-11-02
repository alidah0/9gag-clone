import React, { useState } from "react";
import { usePostsQuery } from "../generated/graphql";
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Flex,
  Spinner,
  Link,
  Image,
} from "@chakra-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { UpdootSection } from "../components/UpdootSection";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout>
      <head>
        <title>9Gags Clone</title>
      </head>
      {!data && loading ? (
        <div>
          <Spinner />
        </div>
      ) : !loading && !data && error ? (
        <>
          <div>Something went wrong!, Query failed!!</div>
          <div>{error.message}</div>
        </>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex direction="column">
                    <Image w="500px" src={p.memePic} alt="meme" />
                    <UpdootSection post={p} />
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      <Flex>
        {data && data.posts.hasMore ? (
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            Load More
          </Button>
        ) : null}
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
