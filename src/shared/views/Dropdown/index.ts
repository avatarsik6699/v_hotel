/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { getMethodName } from 'shared/utiles/getMethodName';
import { $ } from 'shared/utiles/dom';
import { getMenuTemplate } from './Menu/index';
import { dictionary } from './dictionary';
import { IDropdown } from './types';
import { getDropdownTemplate } from './template';
import { addItem, changeItem, deleteItem, isItemSelected } from './helpers';

class Dropdown {
  private childrenSelectors = [
    { key: '$icon', selector: '.dropdown__icon' },
    { key: '$menu', selector: '.dropdown__menu-list' },
    { key: '$field', selector: '.dropdown__input' },
  ];
  private state: {
    items: IDropdown.State['items'];
    selectedItems: IDropdown.State['selectedItems'];
  } = { items: [], selectedItems: [] };
  children: IDropdown.Children;
  $root: HTMLElement;

  constructor(
    selector: IDropdown.Constructor['selector'],
    private config: IDropdown.Constructor['config'],
  ) {
    this.$root = $(selector).$el;
    this.init();
    this.render();
    this.children = this.getChildren(this.$root);
    this.fillInput(this.state.selectedItems);
  }

  init() {
    const { items } = this.config;
    this.bindEvents();
    this.state.items = this.getFormattedItems(items);
    this.state.items.forEach(({ count, id }) =>
      this.updateSelectedItems(id, count),
    );
  }

  render() {
    const { templateData } = this.config;
    const dropdownTemplate = getDropdownTemplate(templateData);
    const menuTemplate = getMenuTemplate({ items: this.state.items });

    $(this.$root).add('start', dropdownTemplate);
    $('.dropdown', this.$root).add('end', menuTemplate);
  }

  handleEvent(ev: IDropdown.EventType) {
    const method = getMethodName<IDropdown.Methods>(ev.type);
    this[method](ev);
  }

  private fillInput(selectedItems: IDropdown.State['selectedItems']) {
    const hasComma = (index: number) =>
      selectedItems.length > 1 && selectedItems.length - 1 !== index;
    const content = selectedItems
      .map(
        ({ category, count }, index) =>
          `${count} ${category}${hasComma(index) ? ', ' : ''}`,
      )
      .join('');

    (this.children.$field as HTMLInputElement).value = content;
  }

  private updateSelectedItems(selectedItemId: number, newCount: number) {
    const { selectedItems } = this.state;

    const isDeleteItem = newCount <= 0;

    const defaultCategoryWord = this.getDefaultCategoryWord(selectedItemId);
    const correctCategoryWord = this.getCorrectCategoryWord(
      defaultCategoryWord,
      newCount,
    );

    this.state.selectedItems = isDeleteItem
      ? deleteItem(selectedItems, selectedItemId)
      : isItemSelected(selectedItems, selectedItemId)
      ? changeItem(selectedItems, selectedItemId, correctCategoryWord, newCount)
      : addItem(selectedItems, selectedItemId, correctCategoryWord, newCount);
  }

  private getDefaultCategoryWord(selectedItemId: number) {
    return this.state.items.find(item => item.id === selectedItemId)
      ?.category as IDropdown.Categories;
  }

  private getCorrectCategoryWord(
    defaultCategoryWord: IDropdown.Categories,
    count: number,
  ) {
    return dictionary[defaultCategoryWord].find(
      ({ before }) => count <= before || before === 'other',
    )?.word as IDropdown.Categories;
  }

  private getFormattedItems(items: IDropdown.Constructor['config']['items']) {
    return items.map(({ id, text, defaultValue }) => ({
      id,
      category: text,
      count: defaultValue,
      isDisabled: defaultValue <= 0,
    }));
  }

  private onClick(ev: IDropdown.EventType) {
    const { target } = ev;
    const { $icon, $menu } = this.children;
    const isClickOnMenu = Boolean(target.closest('.dropdown__menu'));
    const isClickOnHeader = Boolean(target.closest('.dropdown__field'));

    if (isClickOnMenu) {
      if (target.dataset?.action) {
        this.onAction(ev);
      }
    } else if (isClickOnHeader) {
      $icon?.classList.toggle('_opened');
      $menu?.classList.toggle('_opened');
    } else {
      $icon?.classList.remove('_opened');
      $menu?.classList.remove('_opened');
    }
  }

  private getPanelItems(target: EventTarget & HTMLElement) {
    const $panel = target.closest('[data-item_id]') as HTMLElement;
    const $counter = $('.dropdown__menu-count', $panel).$el;
    const $sub = $('.dropdown__menu-sub', $panel).$el as HTMLButtonElement;
    return { $panel, $counter, $sub };
  }

  onAction(ev: IDropdown.EventType) {
    const { target } = ev;
    const { $panel, $counter, $sub } = this.getPanelItems(target);
    const action = target.dataset.action as IDropdown.Actions;

    const selectedItemId = Number($panel.dataset.item_id);
    const newCount = this.changeCounter(action, $counter);

    this.updateSelectedItems(selectedItemId, newCount);
    this.fillInput(this.state.selectedItems);
    $sub.disabled = !(newCount > 0);
  }

  private changeCounter(action: IDropdown.Actions, $counter: HTMLElement) {
    const prevValue = Number($counter.innerHTML);

    if (action === 'add') {
      $counter.textContent = String(prevValue + 1);
    } else {
      $counter.textContent = prevValue <= 0 ? String(0) : String(prevValue - 1);
    }

    return Number($counter.textContent);
  }

  private getChildren($root: HTMLElement): IDropdown.Children {
    return this.childrenSelectors.reduce(
      (acc, { key, selector }) => ({
        ...acc,
        [key]: $(selector, $root).$el,
      }),
      {},
    );
  }

  private bindEvents() {
    window.addEventListener('click', this);
  }
}

const dropdown = new Dropdown('.dropdown-wrapper', {
  items: [
    { id: 1, text: 'Спальни', defaultValue: 1 },
    { id: 2, text: 'Кровати', defaultValue: 2 },
    { id: 3, text: 'Ванные комнаты', defaultValue: 0 },
  ],
  templateData: {
    value: 'Сколько гостей',
    label: 'kek',
  },
});
