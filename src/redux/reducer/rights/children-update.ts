import { RIGHTS_CHILDREN_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const RightsChildrenUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case RIGHTS_CHILDREN_UPDATE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
