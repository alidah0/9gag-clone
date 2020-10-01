import React from "react";
import { NextPage } from "next";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import toErrorMap from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // } else if (response.data?.login.user) {
          //   router.push("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New Password"
              label="New Password"
              type="password"
            />

            <Box mt={4}>
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Change Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
