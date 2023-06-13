import { ADMIN_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userinfo: {},
};
export const AdminAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_ADD:
      return {
        userinfo: action.userinfo,
      };
    default:
      return state;
  }
};
