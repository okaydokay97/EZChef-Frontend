export default function pantryIngredientsReducer(state = [], action) {

  switch (action.type) {

    case 'ADD_PANTRY_INGREDIENTS':
      // console.log(action.pantryIngredients)
      const newState = action.pantryIngredients
      return newState

    case 'ADD_PANTRY_INGREDIENT':

      return [...state, action.pantryIngredient]

    default:
      return state;

  }
};
