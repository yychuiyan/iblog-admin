import { READER_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: [],
};
export const ReaderUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case READER_UPDATE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
