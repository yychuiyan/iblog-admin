import { ADMIN_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  users: [],
};
export const AdminListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_LIST:
      return {
        users: action.users,
      };
    default:
      return state;
  }
};
