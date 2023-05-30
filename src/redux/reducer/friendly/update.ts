import { FRIENDLY_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  fid: [],
};
export const FriendlyUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case FRIENDLY_UPDATE:
      return {
        fid: action.fid,
      };
    default:
      return state;
  }
};
