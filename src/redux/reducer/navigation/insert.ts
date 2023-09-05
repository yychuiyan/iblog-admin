import { NAVIGATION_INSERT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  nav: {},
};
export const NavigationInsertReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_INSERT:
      return {
        nav: action.nav,
      };
    default:
      return state;
  }
};
