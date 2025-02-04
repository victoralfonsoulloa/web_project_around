// Function to handle server requests
function handleServerRequest({ request, handler }) {
  return request
    .then((data) => {
      handler(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export { handleServerRequest };

