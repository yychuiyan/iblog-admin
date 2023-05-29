import { CATEGORY_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categories: String,
};
export const CategoryUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case CATEGORY_UPDATE:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
