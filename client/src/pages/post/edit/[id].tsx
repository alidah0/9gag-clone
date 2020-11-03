import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { getIntId } from "../../../utils/getIntId";
import { imgUrlValidate } from "../../../utils/imgUrlValidate";
import { useIsAuth } from "../../../utils/useIsAuth";
import { withApollo } from "../../../utils/withApollo";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const intId = getIntId();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [updatePost] = useUpdatePostMutation();
  if (loading) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Couldn't find a post!</Box>
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
          const { errors } = await updatePost({
            variables: { id: intId, ...values },
          });
          if (!imgUrlValidate(values.memePic)) {
            setErrors({ memePic: "Meme Picture URL is not valid!" });
          }
          if (!errors) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title..." label="Title" />
            <Box mt={4}>
              <InputField
                name="memePic"
                placeholder="Meme Picture..."
                label="Meme Picture"
              />
            </Box>
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="Text..."
                label="Body"
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

export default withApollo({ ssr: false })(EditPost);
