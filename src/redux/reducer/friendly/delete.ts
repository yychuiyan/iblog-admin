import { FRIENDLY_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  fid: '',
};
export const FriendlyDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case FRIENDLY_DELETE:
      return {
        fid: action.fid,
      };
    default:
      return state;
  }
};
