import { ABOUT_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  about: [],
};
export const AboutAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ABOUT_ADD:
      return {
        about: action.about,
      };
    default:
      return state;
  }
};
