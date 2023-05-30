import { ESSAY_INSERT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  essay: {},
};
export const EssayInsertReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ESSAY_INSERT:
      return {
        essay: action.essay,
      };
    default:
      return state;
  }
};
