import { ARTICLE_STATUS_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articleStatus: [],
};
export const ArticleStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_STATUS_UPDATE:
      return {
        articleStatus: action.articleStatus,
      };
    default:
      return state;
  }
};
