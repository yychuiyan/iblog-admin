import { NAVIGATION_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  nid: [],
};
export const NavigationUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_UPDATE:
      return {
        nid: action.nid,
      };
    default:
      return state;
  }
};
