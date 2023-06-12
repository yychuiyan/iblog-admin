import { RIGHTS_CHILDREN_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const RightsChildrenDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case RIGHTS_CHILDREN_DELETE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
