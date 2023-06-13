import { ROLE_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const RoleDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ROLE_DELETE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
