import { TAG_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  tagId: String,
};
export const TagDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case TAG_DELETE:
      return {
        tagId: action.tagId,
      };
    default:
      return state;
  }
};
