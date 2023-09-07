import { NAVIGATION_CATEGORY_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categories: String,
};
export const NavigationCategoryAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_CATEGORY_ADD:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
