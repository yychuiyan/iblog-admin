import { NAVIGATION_CATEGORY_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categories: [],
};
export const NavigationCategoriesReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_CATEGORY_LIST:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
