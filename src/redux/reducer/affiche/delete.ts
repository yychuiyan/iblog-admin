import { AFFICHE_DELETE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  afficheId: String,
};
export const AfficeDeleteReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case AFFICHE_DELETE:
      return {
        afficheId: action.afficheId,
      };
    default:
      return state;
  }
};
