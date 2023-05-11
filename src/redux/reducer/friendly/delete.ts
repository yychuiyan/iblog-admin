import { FRIENDLY_DELETE } from '@/redux/constants';
const userState = {
  fid: '',
};
export const FriendlyDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case FRIENDLY_DELETE:
      return {
        fid: action.fid,
      };
    default:
      return state;
  }
};
