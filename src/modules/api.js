export default store => dispatch => action => {
  const composeAction = (action, data) => {
    return Object.assign(action, data);
  };

  if (!action.api) {
    return dispatch(action);
  }

  console.log("got action in middleware");

  dispatch(composeAction(action, { resolved: false }));

  return setTimeout(() => {
    let successAction = composeAction(action, {
      resolved: true,
      data: mockedServerChats
    });

    dispatch(successAction);

    // dispatch(composeAction(action, { resolved: true, error: 'mock data test error' }));
  }, 1000);
};
