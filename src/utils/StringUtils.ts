export const toTitleCase = (str: string, delimiter: string) => {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str
    .toLowerCase()
    .split(delimiter)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};
