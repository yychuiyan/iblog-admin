import { ARTICLE_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  detail: [],
};
export const ArticleDetailReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_DELETE:
      return {
        detail: action.detail,
      };
    default:
      return state;
  }
};
