// Function to handle server requests
function handleServerRequest({ request, handler }) {
  return request
    .then((res) => {
      return handler(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { handleServerRequest };

