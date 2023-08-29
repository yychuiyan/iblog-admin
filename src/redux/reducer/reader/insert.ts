import { READER_INSERT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  reader: {},
};
export const ReaderInsertReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case READER_INSERT:
      return {
        reader: action.reader,
      };
    default:
      return state;
  }
};
