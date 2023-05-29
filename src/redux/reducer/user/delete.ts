import { USER_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userId: String,
};
export const UserDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case USER_DELETE:
      return {
        userId: action.userId,
      };
    default:
      return state;
  }
};
