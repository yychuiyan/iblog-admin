import { RIGHTS_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const RightsUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case RIGHTS_UPDATE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
