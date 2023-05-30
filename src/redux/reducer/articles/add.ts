import { ARTICLE_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  article: {},
};
export const ArticleAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_ADD:
      return {
        article: action.article,
      };
    default:
      return state;
  }
};
