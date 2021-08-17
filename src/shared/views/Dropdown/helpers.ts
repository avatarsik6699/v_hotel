import { FormattedMenuItem, IDropdown } from './types';

const isItemSelected = (
  selectedItems: FormattedMenuItem[],
  selectedItemId: number,
) => selectedItems.some(({ id }) => id === selectedItemId);

const deleteItem = (
  selectedItems: IDropdown.State['selectedItems'],
  selectedItemId: number,
) => selectedItems.filter(i => i.id !== selectedItemId);

const changeItem = (
  selectedItems: IDropdown.State['selectedItems'],
  selectedItemId: number,
  correctCategoryWord: IDropdown.Categories,
  newCount: number,
) =>
  selectedItems.map(item =>
    item.id === selectedItemId
      ? { ...item, category: correctCategoryWord, count: newCount }
      : item,
  );

const addItem = (
  selectedItems: IDropdown.State['selectedItems'],
  selectedItemId: number,
  correctCategoryWord: IDropdown.Categories,
  newCount: number,
) => {
  selectedItems.push({
    id: selectedItemId,
    category: correctCategoryWord,
    count: newCount,
    isDisabled: newCount <= 0,
  });
  return selectedItems;
};

export { isItemSelected, addItem, changeItem, deleteItem };
