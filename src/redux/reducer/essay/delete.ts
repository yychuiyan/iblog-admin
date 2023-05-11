import { ESSAY_DELETE } from '@/redux/constants';
const userState = {
  eid: '',
};
export const EssayDeleteReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ESSAY_DELETE:
      return {
        eid: action.eid,
      };
    default:
      return state;
  }
};
