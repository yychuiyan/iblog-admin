import { READER_CHECKED } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  reader: Boolean,
};
export const ReaderCheckedUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case READER_CHECKED:
      return {
        reader: action.reader,
      };
    default:
      return state;
  }
};
