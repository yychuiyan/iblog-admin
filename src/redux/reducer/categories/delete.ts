import { CATEGORY_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  categoryId: String,
};
export const CategoryDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case CATEGORY_DELETE:
      return {
        categoryId: action.categoryId,
      };
    default:
      return state;
  }
};
