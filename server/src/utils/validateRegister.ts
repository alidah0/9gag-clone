import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  const { username, password, email } = options;
  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email!",
      },
    ];
  }

  if (!username || !password) {
    return [
      {
        field: !username ? "username" : "password",
        message: `${!username ? "username" : "password"} is required`,
      },
    ];
  }

  if (username.length <= 2) {
    return [
      {
        field: "username",
        message: "username too shart, must be up to 3 characters",
      },
    ];
  }

  if (username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an @!",
      },
    ];
  }

  if (password.length <= 2) {
    return [
      {
        field: "password",
        message: "password too shart, must be up to 3 characters",
      },
    ];
  }
  return null;
};
