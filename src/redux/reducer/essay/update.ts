import { ESSAY_UPDATE } from '@/redux/constants';
const userState = {
  eid: [],
};
export const EssayUpdateReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ESSAY_UPDATE:
      return {
        eid: action.eid,
      };
    default:
      return state;
  }
};
