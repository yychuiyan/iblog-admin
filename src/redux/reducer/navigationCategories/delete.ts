import { NAVIGATION_CATEGORY_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categoryId: String,
};
export const NavigationCategoryDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_CATEGORY_DELETE:
      return {
        categoryId: action.categoryId,
      };
    default:
      return state;
  }
};
