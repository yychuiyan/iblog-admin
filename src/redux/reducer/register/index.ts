import { USER_REGISTER } from '@/redux/constants';
const userState = {
  userinfo: {},
};
export const RegisterReducer = (state = userState, action: any) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        userinfo: action.userinfo,
      };
    default:
      return state;
  }
};
