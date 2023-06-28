import { AFFICHE_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  affiche: [],
};
export const AfficheUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case AFFICHE_UPDATE:
      return {
        affiche: action.affiche,
      };
    default:
      return state;
  }
};
