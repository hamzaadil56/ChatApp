import { ACTIONS } from "../action/action";
const initial_state = {
  users: [],
  current_user: {},
};
export const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case ACTIONS.SETUSERS:
      return {
        ...state,
        current_user: action.payload,
      };
    case ACTIONS.SETFIREBASEUSERS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};
