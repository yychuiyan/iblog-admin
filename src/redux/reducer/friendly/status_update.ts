import { FRIENDLY_STATUS } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  friendly: Boolean,
};
export const FriendlyStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case FRIENDLY_STATUS:
      return {
        friendly: action.friendly,
      };
    default:
      return state;
  }
};
