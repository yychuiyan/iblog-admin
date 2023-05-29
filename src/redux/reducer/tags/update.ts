import { TAG_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  tags: String,
};
export const TagUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case TAG_UPDATE:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
