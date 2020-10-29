import React, { useState } from "react";
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
  Link,
} from "@chakra-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  });

  return (
    <Layout>
      <head>
        <title>9Gags Clone</title>
      </head>
      {!data && fetching ? (
        <div>
          <Spinner />
        </div>
      ) : !fetching && !data && error ? (
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
                    {/* <img
                      width="400"
                      src="https://i.imgflip.com/11m1m6.jpg"
                      alt="meme"
                    /> */}
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
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
