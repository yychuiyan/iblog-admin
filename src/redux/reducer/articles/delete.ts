import { ARTICLE_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  artId: '',
};
export const ArticleDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_DELETE:
      return {
        artId: action.artId,
      };
    default:
      return state;
  }
};
