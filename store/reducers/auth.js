import { LOGIN, SIGNUP } from "../actions/auth";

export const initialState = {
  token: null,
  userId: null,
  isSignIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
          ...state,
        token: action.token,
        userId: action.userId,
        isSignIn: true
      };
    case SIGNUP:
      return {...state,
        token: action.token,
        userId: action.userId,
        isSignIn: true
      };
    default:
      return state;
  }
};
