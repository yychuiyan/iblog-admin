import { FRIENDLY_CHECKED } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  friendly: Boolean,
};
export const FriendlyCheckedUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case FRIENDLY_CHECKED:
      return {
        friendly: action.friendly,
      };
    default:
      return state;
  }
};
