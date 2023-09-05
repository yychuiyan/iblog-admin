import { NAVIGATION_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  nid: '',
};
export const NavigationDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_DELETE:
      return {
        nid: action.nid,
      };
    default:
      return state;
  }
};
