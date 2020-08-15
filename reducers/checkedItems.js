export default function checkedItemsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_CHECKED_ITEM':
      return [...state, action.checkedItem]

    case 'REMOVE_CHECKED_ITEM':
      return state.filter((i) => i !== action.uncheckedItem)

    default:
      return state;

  }
};
