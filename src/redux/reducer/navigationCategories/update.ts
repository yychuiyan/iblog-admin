import { NAVIGATION_CATEGORY_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categories: String,
};
export const NavigationCategoryUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_CATEGORY_UPDATE:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
