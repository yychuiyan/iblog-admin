import { ADMIN_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userId: String,
};
export const AdminDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_DELETE:
      return {
        userId: action.userId,
      };
    default:
      return state;
  }
};
