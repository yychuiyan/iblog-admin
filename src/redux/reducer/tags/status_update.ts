import { TAG_STATUS_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  tags: Boolean,
};
export const TagStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case TAG_STATUS_UPDATE:
      return {
        tags: action.tags,
      };
    default:
      return state;
  }
};
