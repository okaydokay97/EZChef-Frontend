export default function pantryIngredientsReducer(state = [], action) {

  switch (action.type) {

    case 'ADD_PANTRY_INGREDIENTS':
      const newState = action.pantryIngredients
      return newState

    case 'ADD_PANTRY_INGREDIENT':
      return [...state, action.pantryIngredient]

    case 'REMOVE_PANTRY_INGREDIENT':
      return state.filter((ingredient) => ingredient.id !== action.pantryIngredient.id)

    default:
      return state;

  }
};
