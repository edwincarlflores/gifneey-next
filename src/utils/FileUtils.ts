export const download = async (url = "", filename = "gifneey.gif") => {
  if (!url) {
    return;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {},
  });

  try {
    const buffer = await res.arrayBuffer();
    const blobUrl = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.log(err);
  }
};

export const downloadSync = (url = "", filename = "gifneey.gif") => {
  if (!url) {
    return;
  }

  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const blobUrl = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
