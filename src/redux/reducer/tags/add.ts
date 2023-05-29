import { TAG_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  tags: String,
};
export const TagAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case TAG_ADD:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
