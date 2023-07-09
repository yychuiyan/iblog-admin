import { APOTHEGM_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  apothegm: [],
};
export const ApothegmUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case APOTHEGM_UPDATE:
      return {
        apothegm: action.apothegm,
      };
    default:
      return state;
  }
};
