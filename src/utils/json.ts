// import jju from "jju";
import json5 from "json5";

const isValidJSON5 = (str: string) => {
  try {
    return json5.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};

const parseJSON5 = (str: string) => {
  try {
    return json5.parse(str);
  } catch (e) {
    return false;
  }
};

export { isValidJSON5, parseJSON5 };
