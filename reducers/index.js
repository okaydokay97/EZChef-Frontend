import { combineReducers } from 'redux'
import currentUser from './currentUser'
import pantryIngredients from './pantryIngredients'
import checkedItems from './checkedItems'

export default combineReducers({
  currentUser,
  pantryIngredients,
  checkedItems
})