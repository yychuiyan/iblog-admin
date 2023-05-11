import { MESSAGE_DELETE } from '@/redux/constants';
const userState = {
  msId: '',
};
export const MessageDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case MESSAGE_DELETE:
      return {
        msId: action.msId,
      };
    default:
      return state;
  }
};
