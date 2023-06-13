import { ADMIN_STATUS } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  admin: [],
};
export const AdminStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_STATUS:
      return {
        admin: action.admin,
      };
    default:
      return state;
  }
};
