import { USER_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  users: [],
};
export const UserListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        users: action.users,
      };
    default:
      return state;
  }
};
