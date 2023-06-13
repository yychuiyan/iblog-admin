import { ROLE_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const RoleUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ROLE_UPDATE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
