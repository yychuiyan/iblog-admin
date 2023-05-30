import { ARTICLE_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  artId: [],
};
export const ArticleUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_UPDATE:
      return {
        artId: action.artId,
      };
    default:
      return state;
  }
};
