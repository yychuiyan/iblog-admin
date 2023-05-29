import { CATEGORY_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categories: [],
};
export const CategoriesReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case CATEGORY_LIST:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
