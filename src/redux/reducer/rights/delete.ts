import { RIGHTS_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const RightsDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case RIGHTS_DELETE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
