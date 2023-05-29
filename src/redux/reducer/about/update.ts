import { ABOUT_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  about: [],
};
export const AboutUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ABOUT_UPDATE:
      return {
        about: action.about,
      };
    default:
      return state;
  }
};
