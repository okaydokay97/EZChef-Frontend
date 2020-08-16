export default function favoriteRecipesReducer(state = null, action) {

  switch (action.type) {

    case 'FAVORITE':
      return action.filter

    case 'RANDOM':
      return action.filter

    case 'CHECKED':
      return action.filter

    default:
      return state;

  }
};