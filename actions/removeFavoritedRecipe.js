export const removeFavoritedRecipe = (unfavoritedRecipe) => {
  return {
    type: 'REMOVE_FAVORITED_RECIPE',
    unfavoritedRecipe
  };
};
