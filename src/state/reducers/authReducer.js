import types from "../action-types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  if (action.type === types.SIGN_IN) {
    return { ...state, isSignedIn: true, userId: action.payload };
  } else if (action.type === types.SIGN_OUT) {
    return { ...state, isSignedIn: false, userId: null };
  } else {
    return state;
  }
};
