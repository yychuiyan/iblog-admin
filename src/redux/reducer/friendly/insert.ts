import { FRIENDLY_INSERT } from '@/redux/constants';
const userState = {
  friendly: {},
};
export const FriendlyInsertReducer = (state = userState, action: any) => {
  switch (action.type) {
    case FRIENDLY_INSERT:
      return {
        friendly: action.friendly,
      };
    default:
      return state;
  }
};
