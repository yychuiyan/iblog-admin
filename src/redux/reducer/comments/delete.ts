import { COMMENT_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  commId: '',
};
export const CommentDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case COMMENT_DELETE:
      return {
        commId: action.commId,
      };
    default:
      return state;
  }
};
