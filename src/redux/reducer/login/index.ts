import { ADMIN_LOGIN } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userToken: {},
};
export const LoginReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return {
        userToken: action.userToken,
      };
    default:
      return state;
  }
};
