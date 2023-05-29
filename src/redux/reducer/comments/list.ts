import { ARTICLE_COMMENT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  comments: [],
};
export const CommentsReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_COMMENT:
      return {
        comments: action.comments,
      };
    default:
      return state;
  }
};
