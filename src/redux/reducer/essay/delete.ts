import { ESSAY_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  eid: '',
};
export const EssayDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ESSAY_DELETE:
      return {
        eid: action.eid,
      };
    default:
      return state;
  }
};
