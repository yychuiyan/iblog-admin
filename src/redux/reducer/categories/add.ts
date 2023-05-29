import { CATEGORY_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categories: {},
};
export const CategoryAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case CATEGORY_ADD:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
};
