import { READER_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  rid: '',
};
export const ReaderDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case READER_DELETE:
      return {
        rid: action.rid,
      };
    default:
      return state;
  }
};
