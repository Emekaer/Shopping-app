import { AUTHENTICATE, LOGOUT } from "../actions/auth";

export const initialState = {
  token: null,
  userId: null,
  isSignIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        isSignIn: true,
      };
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
