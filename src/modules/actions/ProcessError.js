export const processError = (message, response) => {
  alert(`Error: ${message}` + `Response: ${JSON.stringify(response)}`);
};
