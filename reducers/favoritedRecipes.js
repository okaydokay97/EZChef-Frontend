export default function favoriteRecipesReducer(state = [], action) {

  switch (action.type) {

    case 'ADD_ALL_FAVORITED_RECIPES':
      return action.allFavoritedRecipes

    case 'ADD_FAVORITE_RECIPE':
      return [...state, action.favoritedRecipe]

    case 'REMOVE_FAVORITED_RECIPE':
      return state.filter((i) => i !== action.unfavoritedRecipe)

    default:
      return state;

  }
};
