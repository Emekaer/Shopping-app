import { AUTHENTICATE } from "../actions/auth";

export const initialState = {
  token: null,
  userId: null,
  isSignIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
          ...state,
        token: action.token,
        userId: action.userId,
        isSignIn: !action.token ? false: true
      };
  /*   case SIGNUP:
      return {...state,
        token: action.token,
        userId: action.userId,
        isSignIn: true
      }; */
    default:
      return state;
  }
};
