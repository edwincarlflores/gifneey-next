const API = async (url = "", config?: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...(config || {}),
  });

  return response.json();
};

export default API;
