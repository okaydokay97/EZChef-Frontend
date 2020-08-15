export const removeChecked = (uncheckedItem) => {
  return {
    type: 'REMOVE_CHECKED_ITEM',
    uncheckedItem
  };
};
