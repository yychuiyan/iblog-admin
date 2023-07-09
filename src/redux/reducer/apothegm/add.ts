import { APOTHEGM_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  apothegm: [],
};
export const ApothegmAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case APOTHEGM_ADD:
      return {
        apothegm: action.apothegm,
      };
    default:
      return state;
  }
};
