import { ADMIN_REGISTER } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userinfo: {},
};
export const RegisterReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_REGISTER:
      return {
        userinfo: action.userinfo,
      };
    default:
      return state;
  }
};
