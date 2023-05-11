import { ARTICLE_LIST_ALL } from '@/redux/constants';
const userState = {
  articles: [],
};
export const ArticleListAllReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_LIST_ALL:
      return {
        articles: action.articles,
      };
    default:
      return state;
  }
};
