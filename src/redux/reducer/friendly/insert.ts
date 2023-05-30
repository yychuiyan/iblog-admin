import { FRIENDLY_INSERT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  friendly: {},
};
export const FriendlyInsertReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case FRIENDLY_INSERT:
      return {
        friendly: action.friendly,
      };
    default:
      return state;
  }
};
