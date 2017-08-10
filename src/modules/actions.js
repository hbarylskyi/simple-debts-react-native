export const CHATS_REQUEST = "CHATS_REQUEST";
export const CHAT_REQUEST = "CHAT_REQUEST";

mockedChatsAction = () => ({
  type: CHATS_REQUEST,
  api: true
});

// TODO remove
export const loadMockedChats = () => (dispatch, getState) => {
  let { chats } = getState();

  if (!chats) {
    return dispatch(mockedChatsAction());
  }
};

export const loadMoreChats = () => {};

export const loadMessages = () => {};
