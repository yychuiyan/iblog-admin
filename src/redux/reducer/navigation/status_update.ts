import { NAVIGATION_STATUS } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  nav: Boolean,
};
export const NavigationStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_STATUS:
      return {
        nav: action.nav,
      };
    default:
      return state;
  }
};
