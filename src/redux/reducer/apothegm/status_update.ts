import { APOTHEGM_STATUS } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  apothegm: Boolean,
};
export const ApothegmStatusUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case APOTHEGM_STATUS:
      return {
        apothegm: action.apothegm,
      };
    default:
      return state;
  }
};
