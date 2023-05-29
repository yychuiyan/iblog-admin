import { MESSAGE_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  msId: '',
};
export const MessageDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case MESSAGE_DELETE:
      return {
        msId: action.msId,
      };
    default:
      return state;
  }
};
