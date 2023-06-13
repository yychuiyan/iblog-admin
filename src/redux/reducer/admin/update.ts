import { ADMIN_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  admin: [],
};
export const AdminUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ADMIN_UPDATE:
      return {
        admin: action.admin,
      };
    default:
      return state;
  }
};
