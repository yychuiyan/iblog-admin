import { MESSAGE_AUDIT_STATUS } from '@/redux/constants';
const userState = {
  message: [],
};
export const MessageStatusUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case MESSAGE_AUDIT_STATUS:
      return {
        message: action.message,
      };
    default:
      return state;
  }
};
