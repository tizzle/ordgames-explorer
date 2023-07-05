import jju from "jju";

const isJSON = (str: string) => {
  try {
    return jju.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

export { isJSON };
