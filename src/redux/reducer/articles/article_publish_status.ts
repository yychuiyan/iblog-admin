import { ARTICLE_PUBLISH_STATUS_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articlePublishStatus: [],
};
export const ArticlePublishStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_PUBLISH_STATUS_UPDATE:
      return {
        articlePublishStatus: action.articlePublishStatus,
      };
    default:
      return state;
  }
};
