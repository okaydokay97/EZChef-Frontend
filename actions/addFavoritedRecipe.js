export const addFavoritedRecipe = (favoritedRecipe) => {
  return {
    type: 'ADD_FAVORITE_RECIPE',
    favoritedRecipe
  };
};
