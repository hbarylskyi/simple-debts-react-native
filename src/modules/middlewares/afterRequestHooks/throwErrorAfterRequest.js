export default () => next => action => {
  if (action.error) {
    console.log(action);
    console.log(action.payload, action.payload.response);

    const { response = {} } = action.payload;
    console.log('here', response);

    throw new Error(response.error);
  }

  return next(action);
};
