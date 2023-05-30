import { ARTICLE_STATUS_TOP_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articleTopStatus: [],
};
export const ArticleStatusTopUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_STATUS_TOP_UPDATE:
      return {
        articleTopStatus: action.articleTopStatus,
      };
    default:
      return state;
  }
};
