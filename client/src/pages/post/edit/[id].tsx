import { Box, Button, Heading } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { getIntId } from "../../../utils/getIntId";
import { imgUrlValidate } from "../../../utils/imgUrlValidate";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = getIntId();
  const [{ data, fetching, error }] = usePostQuery({
    variables: {
      id: intId,
    },
  });

  const [_, updatePost] = useUpdatePostMutation();
  if (fetching) {
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
    <Layout variant="small">
      <head>
        <title>Edit post</title>
      </head>
      <Formik
        initialValues={{
          title: data.post.title,
          memePic: "",
          text: data.post.text,
        }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await updatePost({ id: intId, ...values });
          if (!imgUrlValidate(values.memePic)) {
            setErrors({ memePic: "Meme Picture URL is not valid!" });
          }
          if (!error) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title..." label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="Text..."
                label="Body"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="memePic"
                placeholder="Meme Picture..."
                label="Meme Picture"
              />
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Update Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
