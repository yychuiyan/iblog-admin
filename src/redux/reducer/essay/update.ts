import { ESSAY_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  eid: [],
};
export const EssayUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ESSAY_UPDATE:
      return {
        eid: action.eid,
      };
    default:
      return state;
  }
};
