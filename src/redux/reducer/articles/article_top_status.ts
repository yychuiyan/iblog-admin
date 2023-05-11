import { ARTICLE_STATUS_TOP_UPDATE } from '@/redux/constants';
const userState = {
  articleTopStatus: [],
};
export const ArticleStatusTopUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ARTICLE_STATUS_TOP_UPDATE:
      return {
        articleTopStatus: action.articleTopStatus,
      };
    default:
      return state;
  }
};
