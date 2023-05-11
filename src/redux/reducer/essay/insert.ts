import { ESSAY_INSERT } from '@/redux/constants';
const userState = {
  essay: {},
};
export const EssayInsertReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ESSAY_INSERT:
      return {
        essay: action.essay,
      };
    default:
      return state;
  }
};
