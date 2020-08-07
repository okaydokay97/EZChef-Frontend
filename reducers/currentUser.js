export default function currentUserReducer(state = null, action) {
  switch (action.type) {

    case 'ADD_CURRENT_USER':

      return action.currentUser


    default:
      return state;

  }
};
