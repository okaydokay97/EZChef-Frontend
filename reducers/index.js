import { combineReducers } from 'redux'
import currentUser from './currentUser'
import pantryIngredients from './pantryIngredients'
import checkedItems from './checkedItems'
import favoritedRecipes from './favoritedRecipes'
import filterRecipes from './filterRecipes'

export default combineReducers({
  currentUser,
  pantryIngredients,
  checkedItems,
  favoritedRecipes,
  filterRecipes
})