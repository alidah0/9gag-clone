import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout>
      <head>
        <title>Forgot password</title>
      </head>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                If an account with that email exists, we've sent you an email..
              </Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  placeholder="Your Email Address"
                  label="Your Email Address"
                  type="email"
                />

                <Box mt={4}>
                  <Button
                    type="submit"
                    variantColor="teal"
                    isLoading={isSubmitting}
                  >
                    Forgot Password
                  </Button>
                </Box>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
