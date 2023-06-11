import { RIGHTS_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rights: [],
};
export const RightsListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case RIGHTS_LIST:
      return {
        rights: action.rights,
      };
    default:
      return state;
  }
};
