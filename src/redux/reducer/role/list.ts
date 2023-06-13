import { ROLE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  role: [],
};
export const RoleListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ROLE_LIST:
      return {
        role: action.role,
      };
    default:
      return state;
  }
};
