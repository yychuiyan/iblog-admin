import { APOTHEGM_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  apothegmId: String,
};
export const ApothegmDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case APOTHEGM_DELETE:
      return {
        apothegmId: action.apothegmId,
      };
    default:
      return state;
  }
};
