import { MESSAGE_AUDIT_STATUS } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  message: [],
};
export const MessageStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case MESSAGE_AUDIT_STATUS:
      return {
        message: action.message,
      };
    default:
      return state;
  }
};
