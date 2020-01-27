export default {
  isObject(variable) {
    return (
      typeof variable === "object" &&
      !Array.isArray(variable) &&
      variable !== null
    );
  }
};
