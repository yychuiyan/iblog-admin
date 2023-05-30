import { ARTICLE_LIST_ALL } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articles: [],
};
export const ArticleListAllReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_LIST_ALL:
      return {
        articles: action.articles,
      };
    default:
      return state;
  }
};
