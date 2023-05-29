import { Action } from '@/types/comm';
import { TAG_LIST } from '../../constants';
const userState = {
  tags: [],
};
export const TagsReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case TAG_LIST:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
