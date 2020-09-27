import { FieldError } from "../generated/graphql";

const toErrorMap = (errors: FieldError[]) => {
  const errprMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errprMap[field] = message;
  });
  return errprMap;
};

export default toErrorMap;
