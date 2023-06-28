import { AFFICHE_ADD } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  affiche: [],
};
export const AfficheAddReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case AFFICHE_ADD:
      return {
        affiche: action.affiche,
      };
    default:
      return state;
  }
};
