export const imgUrlValidate = (url: string) => {
  let pattern = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
  return pattern.test(url);
};
