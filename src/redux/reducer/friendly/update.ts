import { FRIENDLY_UPDATE } from '@/redux/constants';
const userState = {
  fid: [],
};
export const FriendlyUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case FRIENDLY_UPDATE:
      return {
        fid: action.fid,
      };
    default:
      return state;
  }
};
