import { combineReducers } from 'redux'
import currentUser from './currentUser'
import pantryIngredients from './pantryIngredients'

export default combineReducers({
  currentUser,
  pantryIngredients
})